import { SemesterType } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import { createAdminRouter } from "../context";
import { toNumericGrade } from "@/helpers";
import { validStudentSchema } from "@/types/spreadsheet";

export const studentDataRouter = createAdminRouter().mutation("upload", {
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
                  firstName: record.name,
                  lastName: record.name,
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
