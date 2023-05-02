export type SubjectStatus = "Passed" | "Failed" | "Not Taken";
export type SubjectDependencyType = "Independent" | "Dependent";
export type SubjectStatuses =
  | "Not Taken"
  | "Passed"
  | {
      type: "Failed";
      grade: number | "INC";
    }
  | {
      type: "Low Year Standing";
      yearStanding: number | "ALL";
      currentYearLevel: number;
    }
  | {
      type: "Failed Prerequisite";
      failedPrerequisites: string[];
    };
export type Status = "Valid" | "Invalid";
