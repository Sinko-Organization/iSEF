export type DependencyList = {
  subjects: {
    subjectCode: string;
    prerequisites: string[];
    coRequisites: string[];
  }[];
  enrollmentType: "Regular" | "Bridging";
}[];
