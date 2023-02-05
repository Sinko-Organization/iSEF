import { TRPCError } from "@trpc/server";
import { P, match } from "ts-pattern";
import { z } from "zod";

import { createAdminRouter } from "../context";
import { getSubjectStatus } from "../student-data/queries";
import {
  getSubjectDependencyStatus,
  getSubjectWithDetails,
  getSubjectsByLevel,
} from "./queries";

export const subjectRouter = createAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.subject.findMany({
        select: {
          id: true,
          name: true,
          stubCode: true,
          units: true,
        },
      });
    },
  })
  .query("getRecommendedSubjects", {
    input: z.object({
      studentRecords: z.array(
        z.object({
          id: z.string(),
          subjectId: z.string(),
          remark: z.enum(["Passed", "Failed"]),
        }),
      ),
      studentId: z.string(),
      courseId: z.string(),
      schoolYearId: z.string(),
      semesterType: z.enum(["FIRST", "SECOND", "SUMMER"] as const),
    }),
    async resolve({ ctx, input }) {
      const {
        studentRecords,
        studentId,
        courseId,
        schoolYearId,
        semesterType,
      } = input;

      const availableSubjects = await Promise.all(
        studentRecords.map(async (record) => {
          const { remark, subjectId } = record;
          const subjectDetails = await getSubjectWithDetails(
            ctx.prisma,
            subjectId,
            courseId,
          );
          return {
            ...subjectDetails,
            remark: remark,
          };
        }),
      ).then(async (subjects) => {
        const passedSubjects = subjects.filter(
          (subject) => subject.remark === "Passed",
        );

        const maxLevel = Math.max(
          ...passedSubjects.map((subject) => subject.level),
        );

        const availableSubjects = await getSubjectsByLevel(
          ctx.prisma,
          courseId,
          maxLevel + 1,
        );

        return availableSubjects;
      });

      const subjectStatuses = await Promise.all(
        availableSubjects.map(async (subjectId) => {
          const status = await getSubjectStatus(
            ctx.prisma,
            subjectId,
            studentId,
            courseId,
            schoolYearId,
            semesterType,
          );

          const dependencyStatus = await getSubjectDependencyStatus(
            ctx.prisma,
            subjectId,
            courseId,
          );

          const subjectDetails = await getSubjectWithDetails(
            ctx.prisma,
            subjectId,
            courseId,
          );

          return {
            ...subjectDetails,
            subjectId,
            status,
            dependencyStatus,
          };
        }),
      );

      const recommendedSubjects = subjectStatuses
        .filter((subject) => {
          return match(subject)
            .with(
              {
                status: P.union("Failed", "Not Taken"),
                dependencyStatus: "Independent",
              },
              () => true,
            )
            .with(
              {
                status: P.union("Failed", "Not Taken"),
                dependencyStatus: "Dependent",
              },
              (subj) => {
                const { dependencies } = subj;

                const dependencyIds = new Set(
                  studentRecords.map((record) => record.subjectId),
                );

                const allDependenciesFound = dependencies.every((dependency) =>
                  dependencyIds.has(dependency),
                );

                return allDependenciesFound;
              },
            )
            .otherwise(() => false);
        })
        .map((subject) => ({
          id: subject.subjectId,
          name: subject.name,
          stubCode: subject.stubCode,
          units: subject.units,
          status: subject.status,
        }));

      return recommendedSubjects;
    },
  })
  /**
   * Mutations
   */
  .mutation("addHierarchy", {
    input: z.object({
      subjectId: z.string(),
      courseId: z.string(),
      level: z.number().int(),
    }),
    async resolve({ ctx, input }) {
      const { subjectId, courseId, level } = input;

      // validate that the subject exists
      await ctx.prisma.subject.findFirstOrThrow({
        where: {
          id: subjectId,
        },
      });

      // validate that the course exists
      await ctx.prisma.course.findFirstOrThrow({
        where: {
          id: courseId,
        },
      });

      const hierarchy = await ctx.prisma.subjectHierarchy.findFirst({
        where: {
          subjectId,
          courseId,
        },
      });

      if (hierarchy) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Subject Hierarchy already exists in course",
        });
      }

      return ctx.prisma.subjectHierarchy.create({
        data: {
          subjectId,
          courseId,
          level,
        },
      });
    },
  })
  .mutation("addDependencies", {
    input: z.object({
      subjectId: z.string(),
      dependencyIds: z.array(z.string()),
      courseId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { subjectId, dependencyIds, courseId } = input;
      // validate that all the dependencies exist
      await ctx.prisma.$transaction(
        dependencyIds.map((dependencyId) =>
          ctx.prisma.subject.findFirstOrThrow({
            where: {
              id: dependencyId,
            },
          }),
        ),
      );

      return ctx.prisma.subjectDependency.createMany({
        data: dependencyIds.map((dependencyId) => ({
          subjectId,
          prereqId: dependencyId,
          courseId,
        })),
      });
    },
  });
