import { z } from "zod";

export const dependencyListV2Schema = z.array(
  z.object({
    subjects: z.array(
      z.discriminatedUnion("type", [
        z.object({
          subjectCode: z.string(),
          prerequisites: z.array(z.string()),
          coRequisites: z.array(z.string()),
          yearStanding: z.union([z.number(), z.literal("ALL")]).optional(),
          units: z.number().optional(),
          name: z.string().optional(),
          type: z.literal("regular"),
        }),
        z.object({
          subjectCode: z.string(),
          referenceCode: z.string(),
          prerequisites: z.array(z.string()),
          coRequisites: z.array(z.string()),
          yearStanding: z.union([z.number(), z.literal("ALL")]).optional(),
          units: z.number().optional(),
          name: z.string().optional(),
          type: z.literal("elective"),
        }),
      ]),
    ),
    enrollmentType: z.enum(["Regular", "Bridging"]),
    yearLevel: z.number(),
    semesterType: z.enum(["FIRST", "SECOND", "SUMMER"]),
    creditUnits: z.number(),
  }),
);
