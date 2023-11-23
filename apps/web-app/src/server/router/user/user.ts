import { z } from "zod";

import { createRouter } from "../context";

export const userRouter = createRouter()
  /**
   * Queries
   */
  .query("role", {
    resolve({ ctx }) {
      return ctx.prisma.user.findUnique({
        where: {
          id: ctx.session?.user?.id,
        },
        select: {
          role: true,
        },
      });
    },
  })
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.user.findMany({
        where: {
          role: "admin"
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    },
  })
  .query("deleteUser", {
    input: z.object({
      email: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.user.delete({
        where: {
          email: input.email
        }
      });
    },
  })
  .query("setAdmin", {
    input: z.object({
      email: z.string(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.user.update({
        where: {
          email: input.email
        },
        data: {
          role: "admin"
        }
      });
    },
  });