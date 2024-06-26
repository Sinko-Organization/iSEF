import { SemesterType } from "@prisma/client";
import type { Prisma } from "@prisma/client";
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
      schoolYear: z.number().optional(),
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
    }),
    async resolve({ ctx, input }) {
      const { studentRecords } = input;

      return ctx.prisma.$transaction([
        ...studentRecords.map((record) => {
          const [startYear, endYear] = record.schoolYear.split("-");
          const schoolYear = {
            startYear: _.toInteger(startYear),
            endYear: _.toInteger(endYear),
          };

          const complexId = `${record.id}-${record.course}-${record.stubCode}-${record.subject}-${schoolYear.startYear}-${record.semesterType}`;
          return ctx.prisma.studentRecord.upsert({
            create: {
              id: complexId,
              grade: toNumericGrade(record.grade),
              semesterType: record.semesterType as SemesterType,
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
              student: {
                update: {
                  firstName: record.firstName,
                  lastName: record.lastName,
                },
              },
            },
          });
        }),
      ]);
    },
  });
