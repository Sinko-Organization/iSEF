import { SemesterType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { toNumericGrade } from "@web-app/helpers";
import { validStudentSchema } from "@web-app/types/spreadsheet";
import { validStudentSchema as validStudentSchemaV2 } from "@web-app/types/spreadsheet/second";
import _ from "lodash";
import { z } from "zod";

import { createAdminRouter } from "../context";

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

      // end year must be start year + 1
      if (schoolYear.endYear !== schoolYear.startYear + 1) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "End year must be one year after start year",
        });
      }

      return ctx.prisma.$transaction([
        ...studentRecords.map((record) => {
          const complexId = `${record.id}-${record.course}-${record.stubCode}-${schoolYear.startYear}-${semester}`;
          return ctx.prisma.studentRecord.upsert({
            create: {
              id: complexId,
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
            where: {
              id: complexId,
            },
            update: {
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
  })
  .mutation("upload.v2", {
    input: z.object({
      studentRecords: z.array(validStudentSchemaV2),
      semester: z.enum(["FIRST", "SECOND", "SUMMER"]),
    }),
    async resolve({ ctx, input }) {
      const { studentRecords, semester } = input;

      return ctx.prisma.$transaction(async (tx) => {
        const promises = studentRecords.map(async (record) => {
          // create school year if not exists
          const [startYear, endYear] = record.schoolYear.split("-");
          const schoolYear = {
            startYear: _.toInteger(startYear),
            endYear: _.toInteger(endYear),
          };

          const yearTransaction = await tx.schoolYear.upsert({
            where: {
              startYear: schoolYear.startYear,
            },
            create: schoolYear,
            update: {},
          });

          // create course if not exists
          const courseTransaction = await tx.course.upsert({
            where: {
              code: record.course,
            },
            create: {
              code: record.course,
              name: record.course,
            },
            update: {},
          });

          // create student if not exists
          const studentTransaction = await tx.student.upsert({
            where: {
              studentIdNumber: record.id,
            },
            create: {
              studentIdNumber: record.id,
            },
            update: {},
          });

          // create subject if not exists
          const subjectTransaction = await ctx.prisma.subject.upsert({
            where: {
              stubCode: record.stubCode,
            },
            create: {
              stubCode: record.stubCode,
              name: record.subject,
              units: _.toNumber(record.units),
            },
            update: {},
          });

          // check if there's an existing record with the same id, course, stubcode, school year, and semester
          const existingRecord = await tx.studentRecord.findFirst({
            where: {
              studentId: studentTransaction.id,
              courseId: courseTransaction.id,
              subjectId: subjectTransaction.id,
              schoolYearId: yearTransaction.id,
            },
          });

          if (!existingRecord) {
            throw Promise.reject(
              new TRPCError({
                code: "CONFLICT",
                message: "Record already exists",
              }),
            );
          }

          const recordFields = {
            grade: toNumericGrade(record.grade),
            semesterType: semester as SemesterType,
            yearLevel: _.toInteger(record.yearLevel),
            schoolYearId: yearTransaction.id,
            courseId: courseTransaction.id,
            studentId: studentTransaction.id,
            subjectId: subjectTransaction.id,
          };

          // create student record
          const studentRecordTransaction = await tx.studentRecord.upsert({
            where: {
              id: existingRecord.id,
            },
            create: recordFields,
            update: recordFields,
          });

          return studentRecordTransaction;
        });

        return Promise.all(promises);
      });
    },
  });
