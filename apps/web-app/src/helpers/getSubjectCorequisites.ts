import type { DependencyListV2 } from "@web-app/models/subject-dependencies/types";

type Subject = DependencyListV2[number]["subjects"][number];

export const getSubjectCorequisites = (
  subjectCode: string,
  dependencies: DependencyListV2,
): Subject[] => {
  return [];
};
