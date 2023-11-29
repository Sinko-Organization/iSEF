import { z } from "zod";
import { Role } from "@prisma/client"

import { createRouter } from "../context";
import { NonNullableValues } from "@web-app/types/generics";


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
            role: Role.superadmin
          }
        },
        select: {
          email: true,
          role: true
        },
      });
    },
  })
  .query("getAllAdmin", {
    async resolve({ ctx }) {
      return ctx.prisma.user.findMany({
        where: {
          role: Role.admin
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
          role: Role.admin
        }
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
          email: email
        },
        data: {
          role: null
        }
      });
    },
  });