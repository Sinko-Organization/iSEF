import { createRouter } from "./context";
import { z } from "zod";
import { validStudentSchema } from "../../types/spreadsheet";

export const studentDataRouter = createRouter().mutation("upload", {
  input: z.array(validStudentSchema),
  resolve({ input }) {
    console.log(input.length);
    return {
      size: input.length,
    };
  },
});
