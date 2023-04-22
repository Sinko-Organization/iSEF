export type DependencyList = {
  subjects: {
    subjectCode: string;
    prerequisites: string[];
    coRequisites: string[];
  }[];
  enrollmentType: "Regular" | "Bridging";
}[];

export type DependencyListV2 = {
  subjects: {
    subjectCode: string;
    prerequisites: string[];
    coRequisites: string[];
    yearStanding?: number;
  }[];
  enrollmentType: "Regular" | "Bridging";
  yearLevel: number;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
}[];
