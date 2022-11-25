import { SemesterType } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import { createAdminRouter } from "../context";
import { validStudentSchema } from "@/types/spreadsheet";
import { toNumericGrade } from "@/utils/helpers";

export const studentDataRouter = createAdminRouter().mutation("upload", {
  input: z.array(validStudentSchema),
  resolve({ ctx, input }) {
    return ctx.prisma.$transaction(
      input.map((record) => {
        return ctx.prisma.studentRecord.create({
          data: {
            grade: toNumericGrade(record.grade),
            semesterType: SemesterType.FIRST,
            schoolYear: 2021,
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
    );
  },
});
