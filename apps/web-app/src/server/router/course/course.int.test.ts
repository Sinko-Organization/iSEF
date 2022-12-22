/**
 * Integration test example for the `example` router
 */
import { afterEach, beforeEach, describe, expect, test } from "vitest";

import { createContextInner, createUserSession } from "../context";
import { appRouter } from "../index";

/**
 * Create a test context for the course router
 */
describe("course router", () => {
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
   * Query all 3 courses
   */
  test("getting 3 courses", async () => {
    const ctx = await createUserSession();

    await ctx.prisma.course.createMany({
      data: [
        {
          id: "1",
          name: "Course 1",
          code: "C1",
        },
        {
          id: "2",
          name: "Course 2",
          code: "C2",
        },
        {
          id: "3",
          name: "Course 3",
          code: "C3",
        },
      ],
    });

    const caller = appRouter.createCaller(ctx);

    const result = await caller.query("course.getAll");

    expect(result).toEqual([
      {
        id: "1",
        name: "Course 1",
        code: "C1",
      },
      {
        id: "2",
        name: "Course 2",
        code: "C2",
      },
      {
        id: "3",
        name: "Course 3",
        code: "C3",
      },
    ]);
  });

  /**
   * Query no courses
   */
  test("getting no courses", async () => {
    const ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    const result = await caller.query("course.getAll");

    expect(result).toEqual([]);
  });

  /**
   * Test for a course that must have no population
   */
  test("getting a course with no population", async () => {
    const ctx = await createUserSession();

    // use a fixed date for createdAt and updatedAt
    const createdAt = new Date(2021, 0, 1);
    const updatedAt = new Date(2021, 0, 1);

    await ctx.prisma.course.create({
      data: {
        id: "1",
        name: "Course 1",
        code: "C1",
        createdAt,
        updatedAt,
      },
    });

    const caller = appRouter.createCaller(ctx);

    const result = await caller.query("course.population", {
      schoolYear: 2021,
      semesterType: "FIRST",
    });

    expect(result).toEqual([
      {
        id: "1",
        name: "Course 1",
        code: "C1",
        studentRecords: [],
        population: 0,
        createdAt,
        updatedAt,
      },
    ]);
  });

  /**
   * @api getStudents
   * Test if gets all student records with the same course id
   */

  // function uses the getStudents function to get all student records with the same course id
  test("getting all student records with the same course id", async () => {
    const ctx = await createUserSession();

    const course1 = await ctx.prisma.course.create({
      data: {
        id: "1",
        name: "Course 1",
        code: "C1",
      },
    });

    const student1 = await ctx.prisma.student.create({
      data: {
        id: "1",
        studentIdNumber: "1",
        firstName: "John",
        lastName: "Doe",
      },
    });

    const student2 = await ctx.prisma.student.create({
      data: {
        id: "2",
        studentIdNumber: "2",
        firstName: "Jane",
        lastName: "Doe",
      },
    });

    const schoolYear = await ctx.prisma.schoolYear.create({
      data: {
        id: "1",
        endYear: 2021,
        startYear: 2020,
      },
    });

    await ctx.prisma.studentRecord.create({
      data: {
        schoolYear: {
          connect: {
            id: schoolYear.id,
          },
        },
        student: {
          connect: {
            id: student1.id,
          },
        },
        course: {
          connect: {
            id: course1.id,
          },
        },
        semesterType: "FIRST",
        grade: 1,
        yearLevel: 1,
        subject: {
          create: {
            id: "1",
            name: "Math",
            stubCode: "MATH",
            units: 3,
          },
        },
      },
    });

    await ctx.prisma.studentRecord.create({
      data: {
        schoolYear: {
          connect: {
            id: schoolYear.id,
          },
        },
        student: {
          connect: {
            id: student2.id,
          },
        },
        course: {
          connect: {
            id: course1.id,
          },
        },
        semesterType: "FIRST",
        grade: 1,
        yearLevel: 1,
        subject: {
          create: {
            id: "2",
            name: "English",
            stubCode: "ENG",
            units: 3,
          },
        },
      },
    });

    const caller = appRouter.createCaller(ctx);

    const result = await caller.query("course.getStudents", {
      courseId: course1.id,
      schoolYear: 2020,
      semesterType: "FIRST",
    });

    expect(result).toEqual([
      {
        id: "1",
        studentIdNumber: "1",
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: "2",
        studentIdNumber: "2",
        firstName: "Jane",
        lastName: "Doe",
      },
    ]);
  });
});
