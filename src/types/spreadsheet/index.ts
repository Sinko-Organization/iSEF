import { z } from "zod";

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

const validStudentSchema = z.object({
  name: z.string(),
  __index: z.string(),
});

const invalidStudentSchema = validStudentSchema.partial();

const allStudentSchema = z.union([validStudentSchema, invalidStudentSchema]);

export const dataOutputSchema = z.object({
  all: allStudentSchema,
  invalidData: invalidStudentSchema,
  validData: validStudentSchema,
});

export type DataOutput = z.infer<typeof dataOutputSchema>;
