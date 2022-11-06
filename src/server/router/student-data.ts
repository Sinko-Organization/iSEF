import { SemesterType } from "@prisma/client";
import _ from "lodash";
import { z } from "zod";

import { validStudentSchema } from "../../types/spreadsheet";
import { createAdminRouter } from "./context";

export const studentDataRouter = createAdminRouter()
  .mutation("upload", {
    input: z.array(validStudentSchema),
    resolve({ ctx, input }) {
      return ctx.prisma.$transaction(
        input.map((record) => {
          return ctx.prisma.studentRecord.create({
            data: {
              grade: _.isNumber(record.grade) ? _.toNumber(record.grade) : 0,
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
  })
  .mutation("upload2", {
    input: z.array(validStudentSchema),
    resolve({ ctx, input }) {
      // map all objects to use only the course
      const courses = input.map((record) => ({
        name: record.course,
        code: record.course,
      }));
      return ctx.prisma.course.createMany({
        data: courses,
        skipDuplicates: true,
      });
    },
  });
