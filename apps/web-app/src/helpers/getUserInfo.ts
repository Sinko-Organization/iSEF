/* eslint-disable unicorn/no-array-reduce */
import type { SemesterType } from "@prisma/client";
import { engineeringDependencies } from "@web-app/models/subject-dependencies";
import type { Courses } from "@web-app/models/subject-dependencies/types";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { match } from "ts-pattern";

type StudentRecords = NonNullable<
  inferQueryOutput<"course.getStudentsV2">[number]["studentRecords"]
>;

export type ErrorResult =
  | "Empty student records"
  | "No student records found"
  | "No current course found"
  | "No enrollment type found";

export type SuccessResult = {
  course: Courses;
  enrollmentType: "Bridging" | "Regular";
  yearLevel: number;
  semesterType: SemesterType;
};

export type UnitsInput = SuccessResult & {
  version: number;
};

type SemesterDetails = [SemesterType, number];

const semesterArray: SemesterType[] = ["FIRST", "SECOND", "SUMMER"];

export const getUserInfo = (
  studentRecords: StudentRecords,
): ErrorResult | SuccessResult => {
  const firstRecord = studentRecords[0];

  if (!firstRecord) {
    return "Empty student records";
  }

  // get the highest year level

  const highestYearLevel = Math.max(
    ...studentRecords.map((record) => record.yearLevel),
  );

  const highestRecords = studentRecords.filter(
    (record) => record.yearLevel === highestYearLevel,
  );

  const firstHighestRecord = highestRecords[0];

  if (!firstHighestRecord) {
    return "No student records found";
  }

  const highestSemesterType = highestRecords.reduce((prev, curr) => {
    if (
      semesterArray.indexOf(prev.semesterType) >
      semesterArray.indexOf(curr.semesterType)
    ) {
      return prev;
    }

    return curr;
  }, firstHighestRecord);

  const { semesterType, yearLevel } = highestSemesterType;

  const nextSemesterDetails = match<SemesterType, SemesterDetails>(semesterType)
    .with("FIRST", () => ["SECOND", yearLevel])
    .with("SECOND", () => ["SUMMER", yearLevel])
    .with("SUMMER", () => ["FIRST", yearLevel + 1])
    .exhaustive();

  const [nextSemesterType, nextYearLevel] = nextSemesterDetails;

  const subjectCodes = studentRecords.map((record) => record.subject.stubCode);

  let currentEnrollment: "Bridging" | "Regular" | null = null;
  let currentCourse: string | null = null;

  for (const [course, dependencyRecord] of Object.entries(
    engineeringDependencies,
  )) {
    for (const [, dependency] of Object.entries(dependencyRecord)) {
      const bridgingSubjects = new Set(
        dependency
          .filter((detail) => detail.enrollmentType === "Bridging")
          .flatMap((detail) =>
            detail.subjects.map((subject) => subject.subjectCode),
          ),
      );
      const regularSubjects = new Set(
        dependency
          .filter((detail) => detail.enrollmentType === "Regular")
          .flatMap((detail) =>
            detail.subjects.map((subject) => subject.subjectCode),
          ),
      );

      // if all subjects are in bridging, then enrollment type is bridging
      // if all subjects are in regular, then enrollment type is regular

      const isBridging = subjectCodes.every((subjectCode) =>
        bridgingSubjects.has(subjectCode),
      );

      if (isBridging) {
        currentEnrollment = "Bridging";
        currentCourse = course;
        break;
      }

      const isRegular = subjectCodes.every((subjectCode) =>
        regularSubjects.has(subjectCode),
      );

      if (isRegular) {
        currentEnrollment = "Regular";
        currentCourse = course;
        break;
      }

      // currentEnrollment = "Regular";
      // currentCourse = course;
    }
  }

  // if (!currentEnrollment) {
  //   return "No enrollment type found";
  // }

  // if (!currentCourse) {
  //   return "No current course found";
  // }

  return {
    course: (currentCourse as Courses) ?? ("Civil" as Courses),
    enrollmentType: currentEnrollment ?? "Regular",
    yearLevel: nextYearLevel,
    semesterType: nextSemesterType,
  };
};

export const getTotalCreditUnits = ({
  course,
  enrollmentType,
  yearLevel,
  semesterType,
  version,
}: UnitsInput) => {
  const courseDependency = engineeringDependencies[course][version];

  if (!courseDependency) return null;

  const dependency = courseDependency
    .filter((detail) => detail.enrollmentType === enrollmentType)
    .find(
      (detail) =>
        detail.yearLevel === yearLevel && detail.semesterType === semesterType,
    );

  if (!dependency) return null;

  return dependency.creditUnits;
};
