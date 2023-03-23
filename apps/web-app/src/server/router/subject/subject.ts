import { TRPCError } from "@trpc/server";
import { seDeptOld } from "@web-app/constants/subject-dependencies";
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
      studentId: z.string(),
      enrollmentType: z.enum(["Regular", "Bridging"]),
    }),
    output: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        stubCode: z.string(),
        units: z.number(),
        status: z.enum(["Failed", "Not Taken"]),
      }),
    ),
    async resolve({ ctx, input }) {
      const { studentId, enrollmentType } = input;

      // get either bridging or regular
      const specifcDependecies = seDeptOld.filter(
        (subject) => subject.enrollmentType === enrollmentType,
      );

      // get only subject codes
      const dependencyList = specifcDependecies.flatMap((subject) =>
        subject.subjects.map((subj) => subj.subjectCode),
      );

      // query subjects from db those that match the codes
      const dependencyCodes = await ctx.prisma.subject.findMany({
        where: {
          stubCode: {
            in: dependencyList,
          },
        },
        select: {
          id: true,
          name: true,
          stubCode: true,
          units: true,
        },
      });

      // find all student records with the same stub code
      const studentRecords = await ctx.prisma.studentRecord.findMany({
        where: {
          studentId,
          subject: {
            stubCode: {
              in: dependencyCodes.map((subj) => subj.stubCode),
            },
          },
        },
        select: {
          grade: true,
          subject: {
            select: {
              id: true,
              name: true,
              stubCode: true,
              units: true,
            },
          },
        },
      });

      const notTakenSubjects = dependencyCodes
        .filter(
          (subj) =>
            !studentRecords.some(
              (record) => record.subject.stubCode === subj.stubCode,
            ),
        )
        .map((subj) => ({
          ...subj,
          status: "Not Taken",
        }));

      const recordSet = [
        ...studentRecords.map((record) => {
          const passed = record.grade >= 1 && record.grade <= 3;
          return {
            id: record.subject.id,
            name: record.subject.name,
            stubCode: record.subject.stubCode,
            units: record.subject.units,
            status: passed ? "Passed" : "Failed",
          };
        }),
        ...notTakenSubjects,
      ] as {
        id: string;
        name: string;
        stubCode: string;
        units: number;
        status: "Passed" | "Failed" | "Not Taken";
      }[];

      // get the list of recordSet, filter out passed subjects, subjects who's dependencies are failed,
      // also add subjects that are in the dependencyCodes because they're not taken
      const recommendedSubjects = recordSet
        .filter(
          (subject) =>
            subject.status === "Failed" || subject.status === "Not Taken",
        )
        .filter((subject) => {
          // filter those whose dependencies aren't passed
          const dependencies =
            specifcDependecies
              .find((level) =>
                level.subjects.find(
                  (subj) => subj.subjectCode === subject.stubCode,
                ),
              )
              ?.subjects.find((subj) => subj.subjectCode === subject.stubCode)
              ?.prerequisites ?? [];

          const allDependenciesFound = dependencies.every((dependency) =>
            recordSet.some(
              (record) =>
                record.stubCode === dependency && record.status === "Passed",
            ),
          );

          return allDependenciesFound;
        }) as {
        id: string;
        name: string;
        stubCode: string;
        units: number;
        status: "Failed" | "Not Taken";
      }[];

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
