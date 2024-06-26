import { employmentType } from "@prisma/client";
import { Department } from "@prisma/client";
import { z } from "zod";

import { createRouter } from "../context";

export const teacherRouter = createRouter()
  /**
   * Queries
   */
  .query("getAll", {
    async resolve({ ctx }) {
      return ctx.prisma.teacher.findMany();
    },
  })
  .query("get", {
    input: z.object({
      teacherId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { teacherId } = input;
      return ctx.prisma.teacher.findUnique({
        where: {
          teacherId: teacherId,
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
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      department: z.nativeEnum(Department),
      employment: z.nativeEnum(employmentType),
      birthday: z.date(),
    }),
    async resolve({ ctx, input }) {
      const {
        teacherId,
        firstName,
        middleName,
        lastName,
        department,
        employment,
        birthday,
      } = input;
      return ctx.prisma.teacher.create({
        data: {
          teacherId: teacherId,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          department: department,
          employment: employment,
          birthday: birthday,
        },
      });
    },
  })
  .mutation("delete", {
    input: z.object({
      teacherId: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { teacherId } = input;
      return ctx.prisma.teacher.delete({
        where: {
          teacherId: teacherId,
        },
      });
    },
  })
  .mutation("update", {
    input: z.object({
      teacherId: z.string(),
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
      department: z.nativeEnum(Department),
      employment: z.nativeEnum(employmentType),
      birthday: z.date(),
    }),
    async resolve({ ctx, input }) {
      const {
        teacherId,
        firstName,
        middleName,
        lastName,
        department,
        employment,
        birthday,
      } = input;
      return ctx.prisma.teacher.update({
        where: {
          teacherId: teacherId,
        },
        data: {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          department: department,
          employment: employment,
          birthday: birthday,
        },
      });
    },
  });
