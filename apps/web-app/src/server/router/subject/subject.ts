import { z } from "zod";

import { createAdminRouter } from "../context";

export const subjectRouter = createAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.subject.findMany({
        select: {
          id: true,
          name: true,
          stubCode: true,
          units: true,
        },
      });
    },
  })
  /**
   * Mutations
   */
  .mutation("addHierarchy", {
    input: z.object({
      subjectId: z.string(),
      courseId: z.string(),
      level: z.number().int(),
    }),
    async resolve({ ctx, input }) {
      const { subjectId, courseId, level } = input;

      // validate that the subject exists
      await ctx.prisma.subject.findFirstOrThrow({
        where: {
          id: subjectId,
        },
      });

      // validate that the course exists
      await ctx.prisma.course.findFirstOrThrow({
        where: {
          id: courseId,
        },
      });

      await ctx.prisma.subjectHierarchy.findFirstOrThrow({
        where: {
          subjectId,
          courseId,
        },
      });

      return ctx.prisma.subjectHierarchy.create({
        data: {
          subjectId,
          courseId,
          level,
        },
      });
    },
  })
  .mutation("addDependencies", {
    input: z.object({
      subjectId: z.string(),
      dependencyIds: z.array(z.string()),
      courseId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { subjectId, dependencyIds, courseId } = input;
      // validate that all the dependencies exist
      await ctx.prisma.$transaction(
        dependencyIds.map((dependencyId) =>
          ctx.prisma.subject.findFirstOrThrow({
            where: {
              id: dependencyId,
            },
          }),
        ),
      );

      return ctx.prisma.subjectDependency.createMany({
        data: dependencyIds.map((dependencyId) => ({
          subjectId,
          prereqId: dependencyId,
          courseId,
        })),
      });
    },
  });
