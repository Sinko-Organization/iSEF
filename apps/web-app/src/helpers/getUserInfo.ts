/* eslint-disable unicorn/no-array-reduce */
import { Either, left, right } from "@effect/data/Either";
import type { SemesterType } from "@prisma/client";
import { engineeringDependencies } from "@web-app/models/subject-dependencies";
import type { inferQueryOutput } from "@web-app/utils/trpc";
import { match } from "ts-pattern";

type StudentRecords = NonNullable<
  inferQueryOutput<"studentData.details">["studentRecords"]
>;

type ErrorResult = "Empty student records" | "No student records found";

type SuccessResult = {
  enrollmentType: "Bridging" | "Regular";
  yearLevel: number;
  semesterType: SemesterType;
};

type SemesterDetails = [SemesterType, number];

const semesterArray: SemesterType[] = ["FIRST", "SECOND", "SUMMER"];

export const getUserInfo = (
  studentRecords: StudentRecords,
): Either<ErrorResult, SuccessResult> => {
  const firstRecord = studentRecords[0];

  if (!firstRecord) {
    return left("Empty student records");
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
    return left("No student records found");
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

  let enrollmentType: "Bridging" | "Regular" | null = null;

  for (const [, dependencyRecord] of Object.entries(engineeringDependencies)) {
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
        enrollmentType = "Bridging";
      }

      const isRegular = subjectCodes.every((subjectCode) =>
        regularSubjects.has(subjectCode),
      );

      if (isRegular) {
        enrollmentType = "Regular";
      }
    }
  }

  if (!enrollmentType) {
    return left("No student records found");
  }

  return right({
    enrollmentType,
    yearLevel: nextYearLevel,
    semesterType: nextSemesterType,
  });
};
