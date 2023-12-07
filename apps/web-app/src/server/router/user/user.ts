import { Role } from "@prisma/client";
import { NonNullableValues } from "@web-app/types/generics";
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
          NOT: {
            role: Role.superadmin,
          },
        },
        select: {
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });
    },
  })
  .query("getAllAdmin", {
    async resolve({ ctx }) {
      return ctx.prisma.user.findMany({
        where: {
          role: Role.admin,
        },
        select: {
          name: true,
          email: true,
          role: true,
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
          email: email,
        },
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
          email: email,
        },
        data: {
          role: Role.admin,
        },
      });
    },
  })

  .mutation("setNotAdmin", {
    input: z.object({
      email: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { email } = input;
      return ctx.prisma.user.update({
        where: {
          email: email,
        },
        data: {
          role: Role.regular,
        },
      });
    },
  });
