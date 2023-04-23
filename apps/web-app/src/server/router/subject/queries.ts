import { R } from "@mobily/ts-belt";
import type { PrismaClient } from "@prisma/client";
import { seDepNew } from "@web-app/models/subject-dependencies";
import {
  getSubjectDependencies,
  getSubjectLevel,
} from "@web-app/models/subject-dependency";

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

  const { name } = await prisma.course.findFirstOrThrow({
    where: {
      id: courseId,
    },
    select: {
      name: true,
    },
  });

  const { stubCode } = await prisma.subject.findFirstOrThrow({
    where: {
      id: subjectId,
    },
    select: {
      stubCode: true,
    },
  });

  const subjectLevel = R.getExn(getSubjectLevel(stubCode, seDepNew));

  const subjectDependencies = R.getExn(
    getSubjectDependencies(stubCode, seDepNew),
  );

  return {
    ...subject,
    level: subjectLevel,
    dependencies: subjectDependencies,
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
  const { stubCode } = await prisma.subject.findFirstOrThrow({
    where: {
      id: subjectId,
    },
    select: {
      stubCode: true,
    },
  });

  const subjectDependencies = R.getExn(
    getSubjectDependencies(stubCode, seDepNew),
  );

  if (subjectDependencies.length === 0) {
    return "Independent";
  }

  return "Dependent";
};
