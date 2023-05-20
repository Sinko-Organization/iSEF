import type { Prisma } from "@prisma/client";
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
  .query("getById", {
    input: z.string(),
    resolve({ ctx, input }) {
      return ctx.prisma.course.findUnique({
        where: {
          id: input,
        },
        select: {
          id: true,
          name: true,
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
      yearLevel: z.number().optional(),
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
                {
                  yearLevel: {
                    equals: input.yearLevel,
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
  })
  .query("getStudentsV2", {
    input: z.object({
      courseId: z.string(),
      schoolYear: z.number(),
      semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
      yearLevel: z.number().optional(),
    }),
    async resolve({ ctx, input }) {
      const schoolYearFilter: Prisma.StudentRecordWhereInput["AND"] =
        !input.schoolYear
          ? []
          : [
              {
                schoolYear: {
                  startYear: {
                    equals: input.schoolYear,
                  },
                },
              },
            ];
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
                {
                  yearLevel: {
                    equals: input.yearLevel,
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
                  email: true,
                  address: true,
                  phoneNumber: true,
                  studentRecords: {
                    where: {
                      AND: schoolYearFilter,
                    },
                    select: {
                      id: true,
                      semesterType: true,
                      grade: true,
                      yearLevel: true,
                      course: {
                        select: {
                          id: true,
                          name: true,
                        },
                      },
                      schoolYear: {
                        select: {
                          id: true,
                          startYear: true,
                          endYear: true,
                        },
                      },
                      subject: {
                        select: {
                          id: true,
                          name: true,
                          stubCode: true,
                          units: true,
                        },
                      },
                    },
                  },
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
  })
  /**
   * Mutations
   */
  .mutation("create", {
    input: z.object({
      name: z.string(),
      code: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.course.create({
        data: {
          name: input.name,
          code: input.code,
        },
      });
    },
  });
