import { z } from "zod";

/**
 * Expected fields for the spreadsheet data
 */
export const fields = [
  {
    label: "First Name",
    key: "firstName",
    alternateMatches: ["first name", "first"],
    fieldType: {
      type: "input",
    },
    example: "Stephanie",
    validations: [
      {
        rule: "required",
        errorMessage: "First Name is required",
        level: "error",
      },
    ],
  },
  {
    label: "Last Name",
    key: "lastName",
    alternateMatches: ["last name", "last"],
    fieldType: {
      type: "input",
    },
    example: "Margaret",
    validations: [
      {
        rule: "required",
        errorMessage: "Last Name is required",
        level: "error",
      },
    ],
  },
];

/**
 * Types for the spreadsheet data
 */
const indexSchema = z.object({
  __index: z.string(),
});

const validStudentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const invalidStudentSchema = validStudentSchema.partial();

const allStudentSchema = z.union([
  z.intersection(validStudentSchema, indexSchema),
  z.intersection(invalidStudentSchema, indexSchema),
]);

export const dataOutputSchema = z.object({
  all: z.array(allStudentSchema),
  invalidData: z.array(invalidStudentSchema),
  validData: z.array(validStudentSchema),
});

export type DataOutput = z.infer<typeof dataOutputSchema>;
