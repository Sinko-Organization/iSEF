import { TRPCError } from "@trpc/server";
import { dependencyListV2Schema } from "@web-app/models/subject-dependencies/schema";
import { seDeptOld } from "@web-app/models/subject-dependencies/software";
import { P, match } from "ts-pattern";
import { z } from "zod";

import { createAdminRouter } from "../context";

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
      dependency: dependencyListV2Schema.optional().default(seDeptOld),
    }),
    output: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        stubCode: z.string(),
        units: z.number(),
        status: z.string(),
        yearLevel: z.number(),
        semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
      }),
    ),
    async resolve({ ctx, input }) {
      const { studentId, enrollmentType, dependency } = input;

      // get either bridging or regular
      const specifcDependecies = dependency.filter(
        (subject) => subject.enrollmentType === enrollmentType,
      );

      // get only subject codes
      const dependencyList = specifcDependecies.flatMap((subject) =>
        subject.subjects.map((subj) =>
          match(subj)
            .with({ type: "regular" }, (s) => s.subjectCode)
            .with({ type: undefined }, (s) => s.subjectCode)
            .with({ type: "elective" }, (s) => s.referenceCode)
            .exhaustive(),
        ),
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
          yearLevel: true,
          grade: true,
          semesterType: true,
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

      // get the lowest year level based on the student records
      // eslint-disable-next-line unicorn/no-array-reduce
      const lowestYearLevel = studentRecords.reduce(
        (prev, curr) => (prev < curr.yearLevel ? prev : curr.yearLevel),
        0,
      );

      // for each subject in the dependency, if the yearStanding exists
      const validYearStandingSubjects = specifcDependecies.filter((subject) =>
        subject.subjects.filter((subj) => {
          const { yearStanding } = subj;
          return match(yearStanding)
            .with(undefined, () => true)
            .with("ALL", () => true)
            .with(P.number, (yearStanding) => {
              return yearStanding <= lowestYearLevel;
            })
            .exhaustive();
        }),
      );

      const dependencyListV2 = new Set(
        validYearStandingSubjects.flatMap((subject) =>
          subject.subjects.flatMap((subj) => subj.subjectCode),
        ),
      );

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
          yearLevel: dependency.find
            ? dependency.find((level) =>
                level.subjects.find((subjects) =>
                  match(subjects.subjectCode)
                    .with(P.string, (code) => code === subj.stubCode)
                    .with(P.array(P.string), (code) =>
                      code.includes(subj.stubCode),
                    )
                    .exhaustive(),
                ),
              )?.yearLevel ?? 0
            : 0,
          semesterType: dependency.find
            ? dependency.find((level) =>
                level.subjects.find((subjects) =>
                  match(subjects.subjectCode)
                    .with(P.string, (code) => code === subj.stubCode)
                    .with(P.array(P.string), (code) =>
                      code.includes(subj.stubCode),
                    )
                    .exhaustive(),
                ),
              )?.semesterType ?? "FIRST"
            : "FIRST",
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
            yearLevel: record.yearLevel,
            semesterType: record.semesterType,
          };
        }),
        ...notTakenSubjects.map((subj) => ({
          ...subj,
        })),
      ];

      // get the list of recordSet, filter out p~sed subjects, subjects who's dependencies are failed,
      // also add subjects that are in the dependencyCodes because they're not taken
      const recommendedSubjects = recordSet
        .filter((record) => dependencyListV2.has(record.stubCode))
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
              ?.subjects.find((subj) =>
                match(subj.subjectCode)
                  .with(P.string, (code) => code === subject.stubCode)
                  .with(P.array(P.string), (code) =>
                    code.includes(subject.stubCode),
                  )
                  .exhaustive(),
              )?.prerequisites ?? [];

          const allDependenciesFound = dependencies.every((dependency) =>
            recordSet.some(
              (record) =>
                record.stubCode === dependency && record.status === "Passed",
            ),
          );

          return allDependenciesFound;
        });

      return recommendedSubjects;
    },
  })
  .query("getRecommendedSubjectsV2", {
    input: z.object({
      studentId: z.string(),
      enrollmentType: z.enum(["Regular", "Bridging"]),
      dependency: dependencyListV2Schema.optional().default(seDeptOld),
    }),
    async resolve({ ctx, input }) {
      const { studentId, enrollmentType, dependency } = input;

      // get either bridging or regular
      const specifcDependecies = dependency.filter(
        (subject) => subject.enrollmentType === enrollmentType,
      );

      // get only subject codes
      const dependencyList = specifcDependecies.flatMap((subject) =>
        subject.subjects.map((subj) => subj.subjectCode),
      );

      const parsedDependencyList = match(dependencyList)
        .with(P.array(P.string), (dependencyList) => dependencyList)
        .with(P.array(P.array(P.string)), (dependencyList) =>
          dependencyList.flat(),
        )
        .run();

      // query subjects from db those that match the codes
      const dependencyCodes = await ctx.prisma.subject.findMany({
        where: {
          stubCode: {
            in: parsedDependencyList,
          },
        },
        select: {
          id: true,
          name: true,
          stubCode: true,
          units: true,
        },
      });

      return {
        dependencyCodes,
        parsedDependencyList,
      };
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
