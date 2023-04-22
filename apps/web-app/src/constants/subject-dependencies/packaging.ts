import { DependencyListV2 } from "./types";

export const PACKAGING_DEPENDENCIES: DependencyListV2 = [
  {
    subjects: [
      {
        subjectCode: "EBMath 1101",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EBMath 1102",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 6",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GEMath 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 1-CWTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 1-LTS",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 1-ROTC",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit1 W",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit1 M",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 1",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "FIRST",
    yearLevel: 1,
  },
  {
    subjects: [
      {
        subjectCode: "EBMath 1201",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "EBEngg 1201",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 1",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "GESocSci 3",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 2-CWTS",
        prerequisites: ["NSTP 1"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 2-LTS",
        prerequisites: ["NSTP 1"],
        coRequisites: [],
      },
      {
        subjectCode: "NSTP 2-ROTC",
        prerequisites: ["NSTP 1"],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit2 W",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "PATHFit2 M",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "RE 2",
        prerequisites: [],
        coRequisites: [],
      },
      {
        subjectCode: "SEAL 2",
        prerequisites: [],
        coRequisites: [],
      },
    ],
    enrollmentType: "Bridging",
    semesterType: "SECOND",
    yearLevel: 1,
  },
];
