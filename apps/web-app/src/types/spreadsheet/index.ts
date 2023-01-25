import { Field } from "react-spreadsheet-import/types/types";
import { z } from "zod";

/**
 * Expected fields for the student spreadsheet data
 */
export const fields: Field<string>[] = [
  {
    label: "ID",
    key: "id",
    alternateMatches: ["id", "Id"],
    fieldType: {
      type: "input",
    },
    example: "06-0971-76",
    validations: [
      {
        rule: "required",
        errorMessage: "ID is required",
        level: "error",
      },
      {
        rule: "regex",
        /**
         * Regex validation
         * String must be separated into three by 2 dashes
         * First part must be 2 digits
         * Second part must be 4 digits
         * Third part must be 2 digits
         */
        value: "^\\d{2}-\\d{4}-\\d{2}$",
        errorMessage: "ID must be in the format ##-####-##",
        flags: "g",
        level: "error",
      },
    ],
  },
  {
    label: "First Name",
    key: "firstName",
    alternateMatches: ["first Name", "first name"],
    fieldType: {
      type: "input",
    },
    example: "John",
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
    alternateMatches: ["last Name", "last name"],
    fieldType: {
      type: "input",
    },
    example: "Doe",
    validations: [
      {
        rule: "required",
        errorMessage: "Last Name is required",
        level: "error",
      },
    ],
  },
  {
    label: "Course",
    key: "course",
    alternateMatches: ["course"],
    fieldType: {
      type: "input",
    },
    example: "BSSE",
    validations: [
      {
        rule: "required",
        errorMessage: "Course is required",
        level: "error",
      },
    ],
  },
  {
    label: "Year Level",
    key: "yearLevel",
    alternateMatches: ["year level", "level", "Year level", "year"],
    fieldType: {
      type: "input",
    },
    example: "1",
    validations: [
      {
        rule: "required",
        errorMessage: "Year Level is required",
        level: "error",
      },
    ],
  },
  {
    label: "Stub Code",
    key: "stubCode",
    alternateMatches: ["stub code", "stub", "Stub code", "stub"],
    fieldType: {
      type: "input",
    },
    example: "1945",
    validations: [
      {
        rule: "required",
        errorMessage: "Stub Code is required",
        level: "error",
      },
    ],
  },
  {
    label: "Subject",
    key: "subject",
    alternateMatches: ["subject", "Subject"],
    fieldType: {
      type: "input",
    },
    example: "Math",
    validations: [
      {
        rule: "required",
        errorMessage: "Subject is required",
        level: "error",
      },
    ],
  },
  {
    label: "Units",
    key: "units",
    alternateMatches: ["units", "Units"],
    fieldType: {
      type: "input",
    },
    example: "3",
    validations: [
      {
        rule: "required",
        errorMessage: "Units is required",
        level: "error",
      },
    ],
  },
  {
    label: "Grade",
    key: "grade",
    alternateMatches: ["grade", "Grade"],
    fieldType: {
      type: "input",
    },
    example: "1.00",
    validations: [
      {
        rule: "required",
        errorMessage: "Grade is required",
        level: "error",
      },
    ],
  },
  {
    label: "Remarks",
    key: "remarks",
    alternateMatches: ["remarks", "Remarks"],
    fieldType: {
      type: "input",
    },
    example: "Passed",
    validations: [
      {
        rule: "required",
        errorMessage: "Remarks is required",
        level: "error",
      },
    ],
  },
];

/**
 * Types for the students spreadsheet data
 */
const indexSchema = z.object({
  __index: z.string(),
});

const trimmedStringSchema = z.string().transform((str) => str.trim());

export const validStudentSchema = z.object({
  id: trimmedStringSchema,
  firstName: trimmedStringSchema,
  lastName: trimmedStringSchema,
  course: trimmedStringSchema,
  yearLevel: trimmedStringSchema,
  stubCode: trimmedStringSchema,
  subject: trimmedStringSchema,
  units: trimmedStringSchema,
  grade: trimmedStringSchema,
  remarks: trimmedStringSchema,
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
