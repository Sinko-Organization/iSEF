import { pipe } from "@effect/data/Function";
import * as O from "@effect/data/Option";
import * as A from "@effect/data/ReadonlyArray";

import type { DependencyListV2 } from "./types";

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
