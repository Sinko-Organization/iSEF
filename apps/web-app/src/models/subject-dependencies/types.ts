import { z } from "zod";

import { dependencyListV2Schema } from "./schema";

export type DependencyList = {
  subjects: {
    subjectCode: string;
    prerequisites: string[];
    coRequisites: string[];
  }[];
  enrollmentType: "Regular" | "Bridging";
}[];

export type DependencyListV2 = z.infer<typeof dependencyListV2Schema>;

export type Courses = "Civil" | "Electronics" | "Mechanical" | "Software";
// | "Packaging"
// | "Chemical"
// | "Electrical"

export type Dependencies = Record<Courses, Record<number, DependencyListV2>>;
