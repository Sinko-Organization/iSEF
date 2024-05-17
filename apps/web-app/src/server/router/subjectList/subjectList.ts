import { Department } from "@prisma/client";
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
        curriculum?: { has: string };
        title?: { contains: string; mode: "insensitive" };
      } = {};

      if (curriculum) {
        whereCondition.curriculum = { has: curriculum };
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
  .query("getAllNoFilter", {
    async resolve({ ctx }) {
      return ctx.prisma.subjectList.findMany();
    },
  })
  // query a single item
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
  // filtering
  .query("getCurriculum", {
    input: z.object({
      curriculum: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { curriculum } = input;
      return ctx.prisma.subjectList.findMany({
        where: {
          curriculum: { has: curriculum },
        },
      });
    },
  })
  .query("getDepartment", {
    input: z.object({
      department: z.nativeEnum(Department),
    }),
    async resolve({ ctx, input }) {
      const { department } = input;
      return ctx.prisma.subjectList.findMany({
        where: {
          department: { has: department },
        },
      });
    },
  })
  .query("getCurriculumAndDepartment", {
    input: z.object({
      curriculum: z.string(),
      department: z.nativeEnum(Department),
    }),
    async resolve({ ctx, input }) {
      const { curriculum, department } = input;
      return ctx.prisma.subjectList.findMany({
        where: {
          AND: [
            {
              curriculum: { has: curriculum },
            },
            {
              department: { has: department },
            },
          ],
        },
      });
    },
  })
  // for dropdown list
  .query("curriculum", {
    async resolve({ ctx }) {
      const distinctCurriculums: string[] = await ctx.prisma
        .$queryRaw`SELECT DISTINCT UNNEST("curriculum") AS curriculum FROM "SubjectList";`;
      return distinctCurriculums;
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
      department: z.nativeEnum(Department),
      units: z.number().int().nonnegative(),
      credits: z.number().int().nonnegative(),
    }),
    async resolve({ ctx, input }) {
      const { title, subCode, curriculum, department, units, credits } = input;
      return ctx.prisma.subjectList.create({
        data: {
          title: title,
          subCode: subCode,
          curriculum: [curriculum],
          department: [department],
          units: units,
          credits: credits,
        },
      });
    },
  })

  .mutation("addMany", {
    input: z.array(
      z.object({
        title: z.string(),
        subCode: z.string(),
        curriculum: z.string(),
        department: z.nativeEnum(Department),
        units: z.number().int().nonnegative(),
        credits: z.number().int().nonnegative(),
      }),
    ),
    async resolve({ ctx, input }) {
      const data = input.map((item) => ({
        title: item.title,
        subCode: item.subCode,
        curriculum: [item.curriculum],
        department: [item.department],
        units: item.units,
        credits: item.credits,
      }));
      return ctx.prisma.subjectList.createMany({
        data: data,
      });
    },
  })

  .mutation("update", {
    input: z.object({
      title: z.string(),
      subCode: z.string(),
      curriculum: z.string(),
      department: z.nativeEnum(Department),
      units: z.number().int().nonnegative(),
      credits: z.number().int().nonnegative(),
    }),
    async resolve({ ctx, input }) {
      const { title, subCode, curriculum, department, units, credits } = input;
      return ctx.prisma.subjectList.update({
        where: {
          subCode: subCode,
        },
        data: {
          title: title,
          curriculum: { push: curriculum },
          department: { push: department },
          units: units,
          credits: credits,
        },
      });
    },
  })
  .mutation("updateMany", {
    input: z.array(
      z.object({
        title: z.string(),
        subCode: z.string(),
        curriculum: z.string(),
        department: z.nativeEnum(Department),
        units: z.number().int().nonnegative(),
        credits: z.number().int().nonnegative(),
      }),
    ),
    async resolve({ ctx, input }) {
      const updates = input.map((update) => ({
        where: { subCode: update.subCode },
        data: {
          title: update.title,
          subCode: update.subCode,
          curriculum: update.curriculum,
          department: update.department,
          units: update.units,
          credits: update.credits,
        },
      }));
      return ctx.prisma.subjectList.updateMany({
        data: updates,
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
  })
  .mutation("deleteMany", {
    input: z.object({
      subCodes: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.subjectList.deleteMany({
        where: {
          subCode: { in: input.subCodes },
        },
      });
    },
  });
