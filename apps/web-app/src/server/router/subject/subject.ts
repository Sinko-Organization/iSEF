/* eslint-disable unicorn/consistent-destructuring */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { TRPCError } from "@trpc/server";
import { seDeptOld } from "@web-app/models/subject-dependencies/software";
import _ from "lodash";
import { P, match } from "ts-pattern";
import { z } from "zod";

import { createAdminRouter } from "../context";
import { Status, SubjectStatuses } from "./types";

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
  .query("getRecommendedSubjectsV2", {
    input: z.object({
      studentId: z.string(),
      enrollmentType: z.enum(["Regular", "Bridging"]),
      course: z.enum(["SE", "CE"]),
    }),
    async resolve({ ctx, input }) {
      const { studentId, enrollmentType, course } = input;

      const selectedDep = match(course)
        .with("SE", () => seDeptOld)
        .with("CE", () => seDeptOld)
        .run();

      // get either bridging or regular
      const specifcDependecies = selectedDep.filter(
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
              in: dependencyList,
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

      // get the highest year level based on the student records
      // eslint-disable-next-line unicorn/no-array-reduce
      const highestYearLevel = studentRecords.reduce(
        (prev, curr) => (prev > curr.yearLevel ? prev : curr.yearLevel),
        0,
      );

      // get the highest semester type based on the student records
      // the order is [FIRST, SECOND, SUMMER] the index is 0, 1, 2
      // eslint-disable-next-line unicorn/no-array-reduce
      const hasSummer = studentRecords
        .filter((record) => record.yearLevel === highestYearLevel)
        .some((record) => record.semesterType === "SUMMER");

      // if semester type is SUMMER, return highest year level + 1, else return highest year level
      const currentYearLevel = hasSummer
        ? highestYearLevel + 1
        : highestYearLevel;

      // for each subject in the dependency, if the yearStanding exists
      const invalidYearStandingSubjects = new Set(
        specifcDependecies
          .flatMap((subject) => subject.subjects)
          .filter((subj) =>
            match(subj.yearStanding)
              .with(undefined, () => false)
              .with(
                "ALL",
                () => studentRecords.length !== specifcDependecies.length - 1,
              )
              .with(P.number, (yearStanding) => {
                return yearStanding > currentYearLevel;
              })
              .exhaustive(),
          )
          .map((subj) => subj.subjectCode),
      );

      const notTakenSubjects = new Set(
        specifcDependecies
          .flatMap((subject) => subject.subjects)
          .map((subj) => subj.subjectCode)
          .filter(
            (subj) =>
              !studentRecords.some(
                (record) => record.subject.stubCode === subj,
              ),
          ),
      );

      const passedSubjects = new Set(
        studentRecords
          .filter((record) => record.grade <= 3 && record.grade >= 1)
          .map((record) => record.subject.stubCode),
      );

      const failedSubjects = new Set(
        studentRecords
          .filter((record) => record.grade > 3 || record.grade === 0)
          .map((record) => record.subject.stubCode),
      );

      const failedPrerequisiteSubjects = new Set(
        specifcDependecies

          .flatMap((subject) => subject.subjects)
          .map((subj) => {
            return {
              stubCode: subj.subjectCode,
              failedPrerequisites: subj.prerequisites.filter(
                (prereq) =>
                  failedSubjects.has(prereq) || notTakenSubjects.has(prereq),
              ),
            };
          })
          .filter((subj) => subj.failedPrerequisites.length > 0),
      );

      // get the codes of the subjects that are not in the db
      const missingCodes = _.difference(
        dependencyList,
        dependencyCodes.map((subj) => subj.stubCode),
      );

      // get the subjects from the dependency that are not in the db
      const missingDependencies = specifcDependecies
        .flatMap((subject) => subject.subjects)
        .filter((subj) => missingCodes.includes(subj.subjectCode))
        .map((dep, index) => {
          const { subjectCode, name, units } = dep;
          const dependency = specifcDependecies.find((level) =>
            level.subjects.find(
              (subjects) => subjects.subjectCode === subjectCode,
            ),
          );

          if (!dependency) {
            throw new Error("Dependency not found in the dependency list");
          }

          return {
            id: index,
            stubCode: subjectCode,
            name: name ?? "N/A",
            units: units ?? 0,
            yearLevel: dependency.yearLevel,
            semesterType: dependency.semesterType,
          };
        });

      const existingDependencies = specifcDependecies
        .flatMap((subject) => subject.subjects)
        .filter((subj) =>
          dependencyCodes
            .map((code) => code.stubCode)
            .includes(subj.subjectCode),
        )
        .map((dep) => {
          const { subjectCode } = dep;
          const dependency = dependencyCodes.find(
            (code) => code.stubCode === subjectCode,
          );
          if (!dependency) {
            throw new Error("Dependency not found");
          }

          const dependencySubj = specifcDependecies.find((level) =>
            level.subjects.find(
              (subjects) => subjects.subjectCode === subjectCode,
            ),
          );

          if (!dependencySubj) {
            throw new Error("Dependency not found");
          }
          return {
            id: dependency.id,
            stubCode: subjectCode,
            name: dependency.name,
            units: dependency.units,
            yearLevel: dependencySubj.yearLevel,
            semesterType: dependencySubj.semesterType,
          };
        });

      const result = [...existingDependencies, ...missingDependencies];

      const mappedResults = result.map((subj) => {
        const { stubCode } = subj;
        const messages: SubjectStatuses[] = [];

        if (invalidYearStandingSubjects.has(stubCode)) {
          const yearStanding = specifcDependecies
            .flatMap((subject) => subject.subjects)
            .find((subj) => subj.subjectCode === stubCode)?.yearStanding;

          if (yearStanding) {
            messages.push({
              type: "Low Year Standing",
              yearStanding,
              currentYearLevel,
            });
          }
        }

        if (notTakenSubjects.has(stubCode)) {
          messages.push("Not Taken");
        }

        if (passedSubjects.has(stubCode)) {
          messages.push("Passed");
        }

        if (failedSubjects.has(stubCode)) {
          const grade = studentRecords.find(
            (record) => record.subject.stubCode === stubCode,
          )?.grade;

          if (grade !== undefined) {
            messages.push({
              type: "Failed",
              grade: grade === 0 ? "INC" : grade,
            });
          }
        }

        // eslint-disable-next-line unicorn/no-array-for-each
        failedPrerequisiteSubjects.forEach((subj) => {
          if (subj.stubCode === stubCode) {
            messages.push({
              type: "Failed Prerequisite",
              failedPrerequisites: subj.failedPrerequisites,
            });
          }
        });

        const hasFailedButOk =
          messages.some((message) =>
            match(message)
              .with({ type: "Failed" }, () => true)
              .otherwise(() => false),
          ) && messages.length === 1;
        const isOnlyNotTaken =
          messages.includes("Not Taken") && messages.length === 1;

        const isValid = hasFailedButOk || isOnlyNotTaken;

        return {
          ...subj,
          status: (isValid ? "Valid" : "Invalid") as Status,
          messages,
        };
      });

      return mappedResults;
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
