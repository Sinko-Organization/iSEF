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
    label: "Attendance",
    key: "attendance",
    alternateMatches: ["attendance", "Attendance"],
    fieldType: {
      type: "input",
    },
    example: "50",
    validations: [
      {
        rule: "required",
        errorMessage: "Attendance is required",
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
    label: "School Year",
    key: "schoolYear",
    alternateMatches: ["school year", "School year", "School Year"],
    fieldType: {
      type: "input",
    },
    example: "2020-2021",
    validations: [
      {
        rule: "required",
        errorMessage: "School Year is required",
        level: "error",
      },
      {
        rule: "regex",
        /**
         * Regex validation
         * String must be separated into two by a dash
         * First part must be 4 digits
         * Second part must be 4 digits
         */
        value: "^\\d{4}-\\d{4}$",
        errorMessage: "School Year must be in the format ####-####",
        flags: "g",
        level: "error",
      },
    ],
  },
  {
    label: "Semester Type",
    key: "semesterType",
    alternateMatches: ["Semester", "semester", "semester type"],
    fieldType: {
      type: "input",
    },
    example: "1",
    validations: [
      {
        rule: "required",
        errorMessage: "Semester Type is required",
        level: "error",
      },
      {
        rule: "regex",
        value: "^[1-3]$",
        errorMessage: "Semester Type must be 1, 2 or 3",
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
  course: trimmedStringSchema,
  yearLevel: trimmedStringSchema,
  stubCode: trimmedStringSchema,
  grade: trimmedStringSchema,
  attendance: trimmedStringSchema,
  remarks: trimmedStringSchema,
  subject: trimmedStringSchema,
  units: trimmedStringSchema,
  schoolYear: trimmedStringSchema,
  semesterType: trimmedStringSchema,
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
