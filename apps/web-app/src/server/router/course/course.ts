import { TRPCError } from "@trpc/server";
import _ from "lodash";
import { z } from "zod";

import { createAdminRouter } from "../context";

export const courseRouter = createAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.course.findMany({
        select: {
          id: true,
          name: true,
          code: true,
        },
      });
    },
  })
  .query("population", {
    input: z.object({
      schoolYear: z.number(),
      semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
    }),
    async resolve({ ctx, input }) {
      // get all the student records for each course and selected the student ids
      return ctx.prisma.course
        .findMany({
          include: {
            studentRecords: {
              where: {
                AND: [
                  {
                    schoolYear: {
                      startYear: {
                        equals: input.schoolYear,
                      },
                    },
                  },
                  {
                    semesterType: {
                      equals: input.semesterType,
                    },
                  },
                ],
              },
              select: {
                student: {
                  select: {
                    id: true,
                    studentIdNumber: true,
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        })
        .then((courses) => {
          // create a new array where you add it only if the studentIdNumber is not yet in the array
          // reutrn the records and the array
          return courses.map((course) => {
            const studentIds = course.studentRecords.map(
              (record) => record.student.studentIdNumber,
            );
            return {
              ...course,
              studentRecords: _.uniq(studentIds),
              population: _.uniq(studentIds).length,
            };
          });
        });
    },
  })
  .query("getStudents", {
    input: z.object({
      courseId: z.string(),
      schoolYear: z.number(),
      semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
    }),
    async resolve({ ctx, input }) {
      const course = await ctx.prisma.course.findUnique({
        where: {
          id: input.courseId,
        },
        include: {
          studentRecords: {
            where: {
              AND: [
                {
                  schoolYear: {
                    startYear: {
                      equals: input.schoolYear,
                    },
                  },
                },
                {
                  semesterType: {
                    equals: input.semesterType,
                  },
                },
              ],
            },
            select: {
              student: {
                select: {
                  id: true,
                  studentIdNumber: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Course not found",
        });
      }

      // remove repeating students with the same studentIdNumber
      const records = _.uniqBy(
        course.studentRecords,
        (record) => record.student.studentIdNumber,
      );

      return records.map((record) => record.student);
    },
  });
