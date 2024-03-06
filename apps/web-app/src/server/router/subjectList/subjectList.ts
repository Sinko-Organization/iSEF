import { z } from "zod";

import { createRouter } from "../context";

export const subjectListRouter = createRouter()
  /**
   * Queries
   */
  .query("getAll", {
    input: z.object({
      curriculum: z.string().optional(),
      search: z.string().optional(),
    }),
    async resolve({ ctx, input }) {
      const { curriculum, search } = input;

      const whereCondition: {
        curriculum?: string;
        title?: { contains: string; mode: "insensitive" };
      } = {};

      if (curriculum) {
        whereCondition.curriculum = curriculum;
      }

      if (search) {
        whereCondition.title = { contains: search, mode: "insensitive" };
      }

      if (curriculum === "All")
        return ctx.prisma.subjectList.findMany({
          where: { title: { contains: search, mode: "insensitive" } },
        });

      return ctx.prisma.subjectList.findMany({
        where: whereCondition,
      });
    },
  })
  .query("get", {
    input: z.object({
      subCode: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { subCode } = input;
      return ctx.prisma.subjectList.findUnique({
        where: {
          subCode: subCode,
        },
      });
    },
  })
  .query("curriculum", {
    async resolve({ ctx }) {
      return ctx.prisma.subjectList.findMany({
        distinct: ["curriculum"],
      });
    },
  })
  /**
   * Mutations
   */
  .mutation("add", {
    input: z.object({
      title: z.string(),
      subCode: z.string(),
      curriculum: z.string(),
      units: z.number().int().nonnegative(),
      credits: z.number().int().nonnegative(),
    }),
    async resolve({ ctx, input }) {
      const { title, subCode, curriculum, units, credits } = input;
      return ctx.prisma.subjectList.create({
        data: {
          title: title,
          subCode: subCode,
          curriculum: curriculum,
          units: units,
          credits: credits,
        },
      });
    },
  })

  .mutation("update", {
    input: z.object({
      title: z.string(),
      subCode: z.string(),
      curriculum: z.string(),
      units: z.number().int().nonnegative(),
      credits: z.number().int().nonnegative(),
    }),
    async resolve({ ctx, input }) {
      const { title, subCode, curriculum, units, credits } = input;
      return ctx.prisma.subjectList.update({
        where: {
          subCode: subCode,
        },
        data: {
          title: title,
          curriculum: curriculum,
          units: units,
          credits: credits,
        },
      });
    },
  })

  .mutation("delete", {
    input: z.object({
      subCode: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { subCode } = input;
      return ctx.prisma.subjectList.delete({
        where: {
          subCode: subCode,
        },
      });
    },
  });
