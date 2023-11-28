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
    async resolve({ ctx }) {
      return ctx.prisma.user.findMany({
        where: {
          role: "admin"
        },
        select: {
          email: true,
          role: true
        },
      });
    },
  })
  /**
   * Mutations
   */
  .mutation("delete", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { email } = input;

      return ctx.prisma.user.delete({
        where: {
          email: email
        }
      });
    },
  })
  
  .mutation("setAdmin", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { email } = input;
      return ctx.prisma.user.update({
        where: {
          email: email
        },
        data: {
          role: "admin"
        }
      });
    },
  });