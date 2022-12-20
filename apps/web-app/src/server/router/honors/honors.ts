import { A, pipe } from "@mobily/ts-belt";
import _ from "lodash";
import { z } from "zod";

import { createAdminRouter } from "../context";

export const honorsRouter = createAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    input: z.object({
      schoolYear: z.number(),
      semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
      yearLevel: z.number().int().min(1).max(5).optional(),
      skip: z.number().default(0),
      take: z.number().default(10),
      sortBy: z.object({
        field: z.enum(["lastName", "gwa"]).default("lastName"),
        order: z.enum(["asc", "desc"]).default("asc"),
      }),
    }),
    async resolve({ ctx, input }) {
      // get all students with honors, invidual grades must be > 2.6 ang the GWA must be > 1.5
      return ctx.prisma.student
        .findMany({
          where: {
            studentRecords: {
              every: {
                AND: [
                  {
                    grade: {
                      lte: 2.6,
                    },
                  },
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
                    yearLevel: input.yearLevel,
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
                    grade: {
                      lte: 2.6,
                    },
                  },
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
                yearLevel: true,
              },
            },
          },
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
            // filter out students with GWA < 1.5
            A.filter((record) => record.gwa <= 1.5),
            // get only the records that are within the skip and take
            A.slice(input.skip, input.skip + input.take),
            // sort the records
            (records) =>
              _.orderBy(records, [input.sortBy.field], [input.sortBy.order]),
          );
        });
    },
  });
