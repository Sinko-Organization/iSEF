export type SubjectStatus = "Passed" | "Failed" | "Not Taken";
export type SubjectDependencyType = "Independent" | "Dependent";
export type InvalidSubject =
  | "Low Year Standing"
  | "Not Taken"
  | "Failed"
  | {
      type: "Failed Prerequisite";
      failedPrerequisites: string[];
    };
