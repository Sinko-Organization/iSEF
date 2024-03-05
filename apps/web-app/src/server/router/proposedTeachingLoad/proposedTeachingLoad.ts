import { z } from "zod";

import { createRouter } from "../context";

export const proposedTeachingLoadRouter = createRouter()
  /**
   * Queries
   */
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.proposedTeachingLoad.findMany();
    },
  })

  /**
   * Mutations
   */
  .mutation("add", {
    input: z.object({
      teacherId: z.string(),
      subCode: z.string(),
      sections: z.number().int().nonnegative(),
      lecHours: z.number().int().nonnegative(),
      labHours: z.number().int().nonnegative(),
      timeRemarks: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      const { teacherId, subCode, sections, lecHours, labHours, timeRemarks } =
        input;
      return ctx.prisma.proposedTeachingLoad.create({
        data: {
          teacherId: teacherId,
          subCode: subCode,
          sections: sections,
          lecHours: lecHours,
          labHours: labHours,
          timeRemarks: timeRemarks,
        },
      });
    },
  })

  .mutation("update", {
    input: z.object({
      teacherId: z.string(),
      subCode: z.string(),
      sections: z.number().int().nonnegative(),
      lecHours: z.number().int().nonnegative(),
      labHours: z.number().int().nonnegative(),
      timeRemarks: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      const { teacherId, subCode, sections, lecHours, labHours, timeRemarks } =
        input;
      return ctx.prisma.proposedTeachingLoad.create({
        data: {
          teacherId: teacherId,
          subCode: subCode,
          sections: sections,
          lecHours: lecHours,
          labHours: labHours,
          timeRemarks: timeRemarks,
        },
      });
    },
  })

  .mutation("delete", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      return ctx.prisma.proposedTeachingLoad.delete({
        where: {
          id: id,
        },
      });
    },
  });
