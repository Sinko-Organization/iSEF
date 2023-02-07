import type { PrismaClient, SemesterType } from "@prisma/client";

import type { SubjectStatus } from "../subject/types";

export const getSubjectStatus = async (
  prisma: PrismaClient,
  subjectId: string,
  studentId: string,
  courseId: string,
  schoolYearId: string,
  semesterType: SemesterType,
): Promise<SubjectStatus> => {
  const studentRecord = await prisma.studentRecord.findFirst({
    where: {
      subjectId,
      studentId,
      schoolYearId,
      semesterType,
      courseId,
    },
    select: {
      id: true,
      grade: true,
    },
  });

  if (!studentRecord) {
    return "Not Taken";
  }

  if (studentRecord.grade >= 1 && studentRecord.grade <= 3) {
    return "Passed";
  } else if (
    (studentRecord.grade > 3 && studentRecord.grade <= 5) ||
    studentRecord.grade === 0
  ) {
    return "Failed";
  }

  return "Failed";
};
