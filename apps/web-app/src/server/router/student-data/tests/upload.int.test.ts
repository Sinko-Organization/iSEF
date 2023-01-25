/**
 * Integration test example for the `student-data` router
 */
import { appRouter } from "@web-app/server/router";
import {
  createContextInner,
  createUserSession,
} from "@web-app/server/router/context";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

/**
 * Create a test context for the student-data router
 */

describe("the upload route", () => {
  let ctx: Awaited<ReturnType<typeof createContextInner>>;

  /**
   * Clean up the database before each test
   */
  beforeEach(async () => {
    ctx = await createContextInner({
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
    ctx = await createContextInner({
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
    ctx = await createUserSession();

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

  test("uploading multiple records with the same student id but different record details", async () => {
    ctx = await createUserSession();

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
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          course: "BSIT",
          yearLevel: "1",
          stubCode: "IT102",
          subject: "Introduction to IT",
          units: "3",
          grade: "2.0",
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

    // find may students and expect only 1
    const studentRecords = await ctx.prisma.student.findMany({
      where: {
        studentIdNumber: "1",
      },
    });

    expect(studentRecords).toHaveLength(1);

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

    // get the subject record
    const subject2 = await ctx.prisma.subject.findUnique({
      where: {
        stubCode: "IT102",
      },
    });

    expect(subject2).toMatchObject({
      id: subject2?.id,
      name: "Introduction to IT",
      stubCode: "IT102",
      units: 3,
      createdAt: subject2?.createdAt,
      updatedAt: subject2?.updatedAt,
    });

    // get the student record
    const studentRecord = await ctx.prisma.studentRecord.findMany({
      where: {
        studentId: student?.id,
      },
    });

    expect(studentRecord).toHaveLength(2);
  });

  test("uploading multiple records of different student id but same course", async () => {
    ctx = await createUserSession();

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
        {
          id: "2",
          firstName: "Jane",
          lastName: "Doe",
          course: "BSIT",
          yearLevel: "1",
          stubCode: "IT101",
          subject: "Introduction to IT",
          units: "3",
          grade: "2.0",
          remarks: "Passed",
        },
      ],
      schoolYear: {
        startYear: 2020,
        endYear: 2021,
      },
      semester: "FIRST",
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

    // check if getting all courses will only return 1
    const courses = await ctx.prisma.course.findMany();

    expect(courses).toHaveLength(1);
  });

  test("uploading multiple records of different student id and but same subject", async () => {
    ctx = await createUserSession();

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
        {
          id: "2",
          firstName: "Jane",
          lastName: "Doe",
          course: "BSIT",
          yearLevel: "1",
          stubCode: "IT101",
          subject: "Introduction to IT",
          units: "3",
          grade: "2.0",
          remarks: "Passed",
        },
      ],
      schoolYear: {
        startYear: 2020,
        endYear: 2021,
      },
      semester: "FIRST",
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
      createdAt: subject?.createdAt,
      updatedAt: subject?.updatedAt,
    });

    // check if getting all subjects will only return 1
    const subjects = await ctx.prisma.subject.findMany();

    expect(subjects).toHaveLength(1);
  });

  test("uploading with start and end year", async () => {
    ctx = await createUserSession();

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

    // find the school year
    const schoolYear = await ctx.prisma.schoolYear.findFirst({
      where: {
        startYear: 2020,
        endYear: 2021,
      },
    });

    // expect it to be not null
    expect(schoolYear).not.toBeNull();

    // find all school years and expect it to be only 1
    const schoolYears = await ctx.prisma.schoolYear.findMany();

    expect(schoolYears).toHaveLength(1);
  });

  test("uploading a data with a grade that isn't a number that is between 1 and 5 inclusive", async () => {
    ctx = await createUserSession();

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
          grade: "7.0",
          remarks: "Passed",
        },
        {
          id: "2",
          firstName: "Jane",
          lastName: "Doe",
          course: "BSSE",
          yearLevel: "3",
          stubCode: "CS50",
          subject: "Introduction to Computer Science",
          units: "2",
          grade: "NA",
          remarks: "Failed",
        },
      ],
      schoolYear: {
        startYear: 2020,
        endYear: 2021,
      },
      semester: "FIRST",
    });

    // get the student record
    const studentRecord = await ctx.prisma.studentRecord.findFirst({
      where: {
        student: {
          studentIdNumber: "1",
        },
      },
    });

    // expect the grade to be zero
    expect(studentRecord?.grade).toBe(0);

    // get the 2nd student record
    const studentRecord2 = await ctx.prisma.studentRecord.findFirst({
      where: {
        student: {
          studentIdNumber: "2",
        },
      },
    });

    // expect the grade to be zero
    expect(studentRecord2?.grade).toBe(0);
  });

  test("uploading start and end year that don't differ by one", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    const uploadMutation = caller.mutation("studentData.upload", {
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
        endYear: 2020,
      },
      semester: "FIRST",
    });

    await expect(uploadMutation).rejects.toThrowError(
      "End year must be one year after start year",
    );
  });

  // TODO: Test when uploading duplicate records
});
