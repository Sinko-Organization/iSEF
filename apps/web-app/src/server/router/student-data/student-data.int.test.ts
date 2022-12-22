/**
 * Integration test example for the `student-data` router
 */
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { createContextInner, createUserSession } from "../context";
import { appRouter } from "../index";

/**
 * Create a test context for the student-data router
 */

describe("the upload route", () => {
  /**
   * Clean up the database before each test
   */
  beforeEach(async () => {
    const ctx = await createContextInner({
      session: null,
    });

    await ctx.prisma.course.deleteMany();
    await ctx.prisma.user.deleteMany();
    await ctx.prisma.student.deleteMany();
    await ctx.prisma.studentRecord.deleteMany();
    await ctx.prisma.schoolYear.deleteMany();
    await ctx.prisma.subject.deleteMany();
  });

  /**
   * Clean up the database after each test
   */
  afterEach(async () => {
    const ctx = await createContextInner({
      session: null,
    });

    await ctx.prisma.course.deleteMany();
    await ctx.prisma.user.deleteMany();
    await ctx.prisma.student.deleteMany();
    await ctx.prisma.studentRecord.deleteMany();
    await ctx.prisma.schoolYear.deleteMany();
    await ctx.prisma.subject.deleteMany();
  });

  /**
   * Test uploading a single record
   */

  test("uploading a single record", async () => {
    const ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    await caller.mutation("studentData.upload", {
      studentRecords: [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          course: "BSIT",
          yearLevel: "1",
          stubCode: "IT101",
          subject: "Introduction to IT",
          units: "3",
          grade: "1.0",
          remarks: "Passed",
        },
      ],
      schoolYear: {
        startYear: 2020,
        endYear: 2021,
      },
      semester: "FIRST",
    });

    // get the student record
    const student = await ctx.prisma.student.findUnique({
      where: {
        studentIdNumber: "1",
      },
    });

    expect(student).toMatchObject({
      id: student?.id,
      studentIdNumber: "1",
      address: null,
      firstName: "John",
      middleName: null,
      lastName: "Doe",
      phoneNumber: null,
      email: null,
      createdAt: student?.createdAt,
      updatedAt: student?.updatedAt,
    });

    // get the course record
    const course = await ctx.prisma.course.findUnique({
      where: {
        code: "BSIT",
      },
    });

    expect(course).toMatchObject({
      id: course?.id,
      name: "BSIT",
      code: "BSIT",
      createdAt: course?.createdAt,
      updatedAt: course?.updatedAt,
    });

    // get the subject record
    const subject = await ctx.prisma.subject.findUnique({
      where: {
        stubCode: "IT101",
      },
    });

    expect(subject).toMatchObject({
      id: subject?.id,
      name: "Introduction to IT",
      stubCode: "IT101",
      units: 3,
      createdAt: subject?.createdAt,
      updatedAt: subject?.updatedAt,
    });
  });
});
