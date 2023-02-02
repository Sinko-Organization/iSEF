import { z } from "zod";

import { createAdminRouter } from "../context";

export const yearLevelRouter = createAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.studentRecord.findMany({
        distinct: ["yearLevel"],
        select: {
          id: true,
          yearLevel: true,
        },
        orderBy: {
          yearLevel: "asc",
        },
      });
    },
  });
