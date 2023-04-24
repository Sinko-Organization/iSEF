import { z } from "zod";

export const dependencyListV2Schema = z.array(
  z.object({
    subjects: z.array(
      z.object({
        subjectCode: z.union([z.string(), z.array(z.string())]),
        prerequisites: z.array(z.string()),
        coRequisites: z.array(z.string()),
        yearStanding: z.union([z.number(), z.literal("ALL")]).optional(),
      }),
    ),
    enrollmentType: z.enum(["Regular", "Bridging"]),
    yearLevel: z.number(),
    semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
    creditUnits: z.number(),
  }),
);
