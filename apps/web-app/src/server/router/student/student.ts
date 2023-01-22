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
      studentIdNumber: z.string().nullable(),
      firstName: z.string().nullable(),
      middleName: z.string().nullable(),
      lastName: z.string().nullable(),
      email: z.string().nullable(),
      address: z.string().nullable(),
      phoneNumber: z.string().nullable(),
    }),
    async resolve({ ctx, input }) {
      if (!input.studentIdNumber) {
        throw new TRPCError({
          message: "Student ID number is required",
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
