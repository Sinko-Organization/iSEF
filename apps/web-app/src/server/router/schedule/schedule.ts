import { subjectType } from "@prisma/client";
import { z } from "zod";

import { createRouter } from "../context";

export const scheduleRouter = createRouter()
  /**
   * Queries
   */
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.schedule.findMany();
    },
  })
  .query("getSubCodeSchedule", {
    input: z.object({
      subCode: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { subCode } = input;
      return ctx.prisma.schedule.findMany({
        where: {
          subCode: { contains: subCode },
        },
      });
    },
  })
  .query("getTeacherSchedule", {
    input: z.object({
      teacherId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { teacherId } = input;
      return ctx.prisma.schedule.findMany({
        where: {
          teacherId: { contains: teacherId },
        },
      });
    },
  })
  /**
   * Mutations
   */
  .mutation("add", {
    input: z.object({
      teacherId: z.string(),
      subCode: z.string(),
      type: z.nativeEnum(subjectType),
      room: z.string(),
      days: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { teacherId, subCode, type, room, days, startTime, endTime } =
        input;
      return ctx.prisma.schedule.create({
        data: {
          teacherId: teacherId,
          subCode: subCode,
          type: type,
          room: room,
          days: [days],
          startTime: startTime,
          endTime: endTime,
        },
      });
    },
  })

  .mutation("addMany", {
    input: z.array(
      z.object({
        teacherId: z.string(),
        subCode: z.string(),
        type: z.nativeEnum(subjectType),
        room: z.string(),
        days: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    ),
    async resolve({ ctx, input }) {
      const data = input.map((item) => ({
        teacherId: item.teacherId,
        subCode: item.subCode,
        type: item.type,
        room: item.room,
        days: [item.days],
        startTime: item.startTime,
        endTime: item.endTime,
      }));
      return ctx.prisma.schedule.createMany({
        data: data,
      });
    },
  })

  .mutation("update", {
    input: z.object({
      id: z.string(),
      teacherId: z.string(),
      subCode: z.string(),
      type: z.nativeEnum(subjectType),
      room: z.string(),
      days: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id, teacherId, subCode, type, room, days, startTime, endTime } =
        input;
      return ctx.prisma.schedule.update({
        where: {
          id: id,
        },
        data: {
          teacherId: teacherId,
          subCode: subCode,
          type: type,
          room: room,
          days: [days],
          startTime: startTime,
          endTime: endTime,
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
      return ctx.prisma.schedule.delete({
        where: {
          id: id,
        },
      });
    },
  })
  .mutation("deleteMany", {
    input: z.object({
      id: z.array(z.string()),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.schedule.deleteMany({
        where: {
          id: { in: input.id },
        },
      });
    },
  });
