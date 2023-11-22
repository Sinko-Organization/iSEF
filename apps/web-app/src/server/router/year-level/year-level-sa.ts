import { z } from "zod";

import { createSuperAdminRouter } from "../context";

export const yearLevelRouterSA = createSuperAdminRouter()
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
