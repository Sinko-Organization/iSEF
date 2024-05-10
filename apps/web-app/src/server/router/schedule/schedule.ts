import { subjectType } from "@prisma/client";
import { z } from "zod";

import { createRouter } from "../context";

export const scheduleRouter = createRouter()
  /**
   * Queries
   */
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.schedule.findMany({
        include: {
          teacher: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
          subject: {
            select: {
              subCode: true,
            },
          },
        },
      });
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
          subject: {
            subCode: subCode, // Assuming 'subCode' is the field in SubjectList
          },
        },
        include: {
          subject: true, // Include the SubjectList data
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
      subjectId: z.string(),
      type: z.nativeEnum(subjectType),
      room: z.string(),
      days: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { teacherId, subjectId, type, room, days, startTime, endTime } =
        input;
      return ctx.prisma.schedule.create({
        data: {
          teacherId: teacherId,
          subjectId: subjectId,
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
        subjectId: z.string(),
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
        subjectId: item.subjectId,
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
          subjectId: subCode,
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
