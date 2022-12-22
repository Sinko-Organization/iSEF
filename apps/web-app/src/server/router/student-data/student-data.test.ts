/**
 * Integration test example for the `student-data` router
 */
import { afterEach, describe, expect, test } from "vitest";

import { createContextInner, createUserSession } from "../context";
import { appRouter } from "../index";

/**
 * Create a test context for the student-data router
 */

describe("the upload route", () => {
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

    // query all students and expect 1
    const student = await ctx.prisma.student.findUnique({
      where: {
        studentIdNumber: "1",
      },
    });

    expect(student).not.toBeNull();

    // if (student) {
    //   expect(student).toEqual({
    //     id: student.id,
    //     studentIdNumber: "1",
    //     firstName: "John",
    //     lastName: "Doe",
    //     middleName: null,
    //     address: null,
    //     email: null,
    //     phoneNumber: null,
    //     createdAt: student.createdAt,
    //     updatedAt: student.updatedAt,
    //   });
    // }
  });
});
