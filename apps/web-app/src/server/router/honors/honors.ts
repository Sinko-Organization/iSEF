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
      skip: z.number().default(0),
      take: z.number().default(10),
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
              },
            },
          },
        })
        .then((records) => {
          // filter out students with GWA < 1.5
          return records.filter((record) => {
            const gwa =
              _.sumBy(record.studentRecords, (record) => {
                return record.grade * record.subject.units;
              }) /
              _.sumBy(record.studentRecords, (record) => {
                return record.subject.units;
              });
            return gwa <= 1.5;
          });
        })
        .then((records) => {
          // return with the gwa

          return records.map((record) => {
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
          });
        })
        .then((records) => {
          return _.slice(records, input.skip, input.skip + input.take);
        });
    },
  });
