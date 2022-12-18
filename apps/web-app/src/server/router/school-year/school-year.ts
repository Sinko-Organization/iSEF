import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createAdminRouter } from "../context";

export const schoolYearRouter = createAdminRouter()
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
  });
