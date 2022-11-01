import { createRouter } from "./context";
import { z } from "zod";
import { validStudentSchema } from "../../types/spreadsheet";

export const studentDataRouter = createRouter()
  .mutation("upload", {
    input: z.array(validStudentSchema),
    resolve({ ctx, input }) {
      return "None";
    },
  })
  .mutation("upload2", {
    input: z.array(validStudentSchema),
    resolve({ ctx, input }) {
      // map all objects to use only the course
      const courses = input.map((record) => ({
        name: record.course,
        code: record.course,
      }));
      return ctx.prisma.course.createMany({
        data: courses,
        skipDuplicates: true,
      });
    },
  });
