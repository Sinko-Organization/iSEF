import { A, pipe } from "@mobily/ts-belt";
import _ from "lodash";
import { P, match } from "ts-pattern";
import { z } from "zod";

import { createSuperAdminRouter } from "../context";

export const honorsRouterSA = createSuperAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    input: z.object({
      schoolYear: z.number(),
      semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
      yearLevel: z.union([z.enum(["ALL"]), z.number().min(1)]).nullable(),
      courseId: z.string().nullable(),
      sortBy: z.object({
        field: z.enum(["lastName", "gwa"]).default("lastName"),
        order: z.enum(["asc", "desc"]).default("asc"),
      }),
    }),
    output: z.array(
      z.object({
        id: z.string(),
        studentIdNumber: z.string(),
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
        gwa: z.number(),
        studentRecords: z.array(
          z.object({
            id: z.string(),
            grade: z.number(),
            subject: z.object({
              id: z.string(),
              name: z.string(),
              units: z.number(),
            }),
            course: z.object({
              id: z.string(),
              name: z.string(),
            }),
            yearLevel: z.number(),
          }),
        ),
      }),
    ),
    async resolve({ ctx, input }) {
      // get all students with honors, invidual grades must be > 2.6 ang the GWA must be > 1.5
      return ctx.prisma.student
        .findMany({
          where: {
            studentRecords: {
              some: {
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
                    yearLevel: match(input.yearLevel)
                      .with(P.number, (yearLevel) => yearLevel)
                      // eslint-disable-next-line unicorn/no-useless-undefined
                      .otherwise(() => undefined),
                  },
                  {
                    courseId: input.courseId ?? undefined,
                  },
                ],
              },
            },
          },
          select: {
            id: true,
            studentIdNumber: true,
            firstName: true,
            lastName: true,
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
                subject: {
                  select: {
                    id: true,
                    name: true,
                    units: true,
                  },
                },
                course: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                yearLevel: true,
              },
            },
          },
        })
        .then((records) => {
          return pipe(
            records,
            A.filter((record) => {
              return record.studentRecords.every((record) => {
                return record.grade >= 1;
              });
            }),
          );
        })
        .then((records) => {
          return pipe(
            records,
            // return with the gwa
            A.map((record) => {
              const gwa =
                _.sumBy(record.studentRecords, (record) => {
                  return record.grade * record.subject.units;
                }) /
                _.sumBy(record.studentRecords, (record) => {
                  return record.subject.units;
                });

              return {
                ...record,
                gwa,
              };
            }),
            // filter out students with GWA <= 2 and GWA >= 1
            A.filter((record) => record.gwa <= 2 && record.gwa >= 1),
            // sort the records
            (records) =>
              _.orderBy(records, [input.sortBy.field], [input.sortBy.order]),
          );
        });
    },
  });
