import { z } from "zod";

import { createSuperAdminRouter } from "../context";

export const schoolYearRouterSA = createSuperAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.schoolYear.findMany({
        select: {
          id: true,
          startYear: true,
          endYear: true,
        },
      });
    },
  })
  .query("getByStudentID", {
    input: z.object({
      studentId: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.schoolYear.findMany({
        where: {
          studentRecords: {
            some: {
              studentId: input.studentId,
            },
          },
        },
        select: {
          id: true,
          startYear: true,
          endYear: true,
        },
      });
    },
  });
