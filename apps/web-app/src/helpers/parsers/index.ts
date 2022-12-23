import { z } from "zod";

// function that takes in a schema and makes it optional
export const makeSchemaOptional = <T>(schema: z.ZodType<T>) => {
  return schema.optional();
};

// function that takes in a string and transforms it by trimming whitespace
export const trimSchema = (schema: z.ZodType<string>) => {
  return schema.transform((value) => value.trim());
};
