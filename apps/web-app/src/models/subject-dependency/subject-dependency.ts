/* eslint-disable unicorn/no-array-callback-reference */
import { A, O, R, pipe } from "@mobily/ts-belt";
import type { DependencyList } from "@web-app/constants/subject-dependencies/types";

type SubjectType = DependencyList[number]["subjects"][number];

export const findSubject = (
  subjectCode: string,
  subjectDependency: DependencyList,
) => {
  return pipe(
    subjectDependency,
    A.map((dependencies) => dependencies.subjects),
    A.flat,
    A.find((subject) => subject.subjectCode === subjectCode),
    O.toResult("Subject not found"),
  );
};

export const getSubjectLevel = (
  subjectCode: string,
  subjectDependency: DependencyList,
) => {
  return pipe(
    subjectDependency,
    A.map((dependencies) => dependencies.subjects),
    A.flat,
    A.getIndexBy((subject) => subject.subjectCode === subjectCode),
    O.map((index) => index + 1),
    O.toResult("Subject not found"),
  );
};

export const getSubjectsByLevel = (
  courseId: string,
  maxLevel: number,
  subjectDependency: DependencyList,
) => {
  return pipe(
    subjectDependency,
    A.map((dependencies) => dependencies.subjects),
    A.flat,
    A.takeExactly(maxLevel),
  );
};

export const getSubjectPrerequisites = (
  subject: SubjectType,
  subjectDependency: DependencyList,
) => {
  return pipe(
    subject.prerequisites,
    A.map((prerequisite) => findSubject(prerequisite, subjectDependency)),
    A.filter(R.isOk),
    A.map(R.getExn),
  );
};

export const getSubjectDependencies = (
  subjectCode: string,
  subjectDependency: DependencyList,
) => {
  const subject = findSubject(subjectCode, subjectDependency);
  return pipe(
    subject,
    R.map((subject) =>
      getSubjectPrerequisites(subject, subjectDependency).map(
        (prerequisite) => prerequisite.subjectCode,
      ),
    ),
  );
};
