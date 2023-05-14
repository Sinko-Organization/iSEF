import { pipe } from "@effect/data/Function";
import * as O from "@effect/data/Option";
import * as A from "@effect/data/ReadonlyArray";

import type { DependencyListV2 } from "./types";

type SubjectDetailsV2 = NonNullable<ReturnType<typeof findSubjectDetails>>;

export const findSubjectDetails = (
  subjectCode: string,
  dependency: DependencyListV2,
) => {
  return pipe(
    A.fromIterable(dependency),
    A.flatMap((details) => details.subjects),
    A.findFirst((subject) => subject.subjectCode === subjectCode),
    O.getOrNull,
  );
};

export const findSubjectCorequisites = (
  subjectCode: string,
  dependency: DependencyListV2,
) => {
  const coRequisites: SubjectDetailsV2[] = [];
  const directCorequisite = dependency
    .flatMap((details) => details.subjects)
    .filter((subject) => subject.subjectCode === subjectCode)
    .flatMap((subject) => subject.coRequisites);

  if (!directCorequisite) return [];

  for (const corequisite of directCorequisite) {
    const details = findSubjectDetails(corequisite, dependency);
    if (details) {
      coRequisites.push(details);
    }
  }

  const indirectCorequisites = dependency
    .flatMap((details) => details.subjects)
    .filter((subject) => subject.coRequisites.includes(subjectCode));

  for (const corequisite of indirectCorequisites) {
    coRequisites.push(corequisite);
  }

  return coRequisites;
};
