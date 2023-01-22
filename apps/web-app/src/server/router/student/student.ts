import { TRPCError } from "@trpc/server";
import { isNull, omitBy } from "lodash";
import { z } from "zod";

import { createAdminRouter } from "../context";

export const studentRouter = createAdminRouter()
  /**
   * Queries
   */
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.student.findMany({
        select: {
          id: true,
          studentIdNumber: true,
          firstName: true,
          lastName: true,
          email: true,
          address: true,
          phoneNumber: true,
        },
      });
    },
  })
  /**
   * Mutations
   */
  .mutation("update", {
    input: z.object({
      id: z.string(),
      studentIdNumber: z.string().nullable().optional(),
      firstName: z.string().nullable().optional(),
      middleName: z.string().nullable().optional(),
      lastName: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      address: z.string().nullable().optional(),
      phoneNumber: z.string().nullable().optional(),
    }),
    async resolve({ ctx, input }) {
      if (!input.studentIdNumber) {
        throw new TRPCError({
          message: "Student ID number is required",
          code: "PRECONDITION_FAILED",
        });
      }

      // throw error if student id exists
      const studentRecordId = await ctx.prisma.student.findMany({
        where: {
          studentIdNumber: input.studentIdNumber,
        },
        select: {
          id: true,
        },
      });

      // make sure that the array must have either a length of 0 or
      // the array must have a length of 1 and the id must be the same as the input id
      const { length } = studentRecordId;
      if (length > 1 || (length === 1 && studentRecordId[0]?.id !== input.id)) {
        throw new TRPCError({
          message: "Student ID number already exists",
          code: "PRECONDITION_FAILED",
        });
      }

      const removedNulls = omitBy(input, isNull);

      return ctx.prisma.student.update({
        where: {
          studentIdNumber: input.studentIdNumber,
        },
        data: {
          ...removedNulls,
        },
      });
    },
  });
