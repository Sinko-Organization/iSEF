import { SemesterType } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import { createAdminRouter } from "../context";
import { toNumericGrade } from "@/helpers";
import { validStudentSchema } from "@/types/spreadsheet";

export const studentDataRouter = createAdminRouter()
  /**
   * Queries
   */
  .query("details", {
    input: z.object({
      studentId: z.string(),
      schoolYear: z.number(),
      semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.student.findFirstOrThrow({
        where: {
          id: input.studentId,
        },
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
              id: true,
              grade: true,
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
      });
    },
  })
  /**
   * Mutations
   */
  .mutation("upload", {
    input: z.object({
      studentRecords: z.array(validStudentSchema),
      schoolYear: z.object({
        startYear: z.number().int().min(1990).max(2100),
        endYear: z.number().int().min(1991).max(2101),
      }),
      semester: z.enum(["FIRST", "SECOND", "SUMMER"]),
    }),
    async resolve({ ctx, input }) {
      const { studentRecords, schoolYear, semester } = input;

      return ctx.prisma.$transaction([
        ...studentRecords.map((record) => {
          return ctx.prisma.studentRecord.create({
            data: {
              grade: toNumericGrade(record.grade),
              semesterType: semester as SemesterType,
              yearLevel: _.toInteger(record.yearLevel),
              schoolYear: {
                connectOrCreate: {
                  where: {
                    startYear: schoolYear.startYear,
                  },
                  create: {
                    startYear: schoolYear.startYear,
                    endYear: schoolYear.endYear,
                  },
                },
              },
              course: {
                connectOrCreate: {
                  where: {
                    code: record.course,
                  },
                  create: {
                    code: record.course,
                    name: record.course,
                  },
                },
              },
              student: {
                connectOrCreate: {
                  where: {
                    studentIdNumber: record.id,
                  },
                  create: {
                    studentIdNumber: record.id,
                    firstName: record.firstName,
                    lastName: record.lastName,
                  },
                },
              },
              subject: {
                connectOrCreate: {
                  where: {
                    stubCode: record.stubCode,
                  },
                  create: {
                    stubCode: record.stubCode,
                    name: record.subject,
                    units: _.toNumber(record.units),
                  },
                },
              },
            },
          });
        }),
        ctx.prisma.schoolYear.upsert({
          where: {
            startYear: schoolYear.startYear,
          },
          create: {
            startYear: schoolYear.startYear,
            endYear: schoolYear.endYear,
          },
          update: {},
        }),
      ]);
    },
  });
