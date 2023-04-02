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
  }[];
  enrollmentType: "Regular" | "Bridging";
  yearStanding?: number;
  yearLevel: number;
  semesterType: "FIRST" | "SECOND" | "SUMMER";
}[];
