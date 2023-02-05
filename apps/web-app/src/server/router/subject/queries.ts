import type { PrismaClient } from "@prisma/client";

import type { SubjectDependencyType } from "./types";

export const getSubjectWithDetails = async (
  prisma: PrismaClient,
  subjectId: string,
  courseId: string,
) => {
  const subject = await prisma.subject.findFirstOrThrow({
    where: {
      id: subjectId,
    },
    select: {
      id: true,
      name: true,
      stubCode: true,
      units: true,
    },
  });

  const subjectLevel = await prisma.subjectHierarchy.findFirstOrThrow({
    where: {
      subjectId,
      courseId,
    },
    select: {
      level: true,
    },
  });

  const subjectDependencies = await prisma.subjectDependency.findMany({
    where: {
      subjectId,
      courseId,
    },
    select: {
      prereqId: true,
    },
  });

  return {
    ...subject,
    level: subjectLevel.level,
    dependencies: subjectDependencies.map((d) => d.prereqId),
  };
};

export const getSubjectsByLevel = async (
  prisma: PrismaClient,
  courseId: string,
  level: number,
) => {
  const subjects = await prisma.subjectHierarchy.findMany({
    where: {
      courseId,
      level: {
        lte: level,
      },
    },
    select: {
      subjectId: true,
    },
  });

  return subjects.map((s) => s.subjectId);
};

export const getSubjectDependencyStatus = async (
  prisma: PrismaClient,
  subjectId: string,
  courseId: string,
): Promise<SubjectDependencyType> => {
  const subjectDependencies = await prisma.subjectDependency.findFirst({
    where: {
      subjectId,
      courseId,
    },
    select: {
      id: true,
      prereqId: true,
    },
  });

  if (!subjectDependencies) {
    return "Independent";
  }

  return "Dependent";
};
