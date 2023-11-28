/**
 * Integration test example for the `teacher` router
 */
import { appRouter } from "@web-app/server/router";
import {
  createContextInner,
  createUserSession,
} from "@web-app/server/router/context";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

/**
 * Create a test context for the teacher router
 */

describe("testing the teacherRoute", () => {
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
    await ctx.prisma.teacher.deleteMany();
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
    await ctx.prisma.teacher.deleteMany();
  });

  /**
   * test getAll teachers
   */
  test("test query 'getAll' to retrieve all teachers", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);
    
    await ctx.prisma.teacher.createMany({
      data: [
        {
            teacherId: "1234",
            firstName: "King",
            middleName: "Voo",
            lastName : "Doo",
            employment: "parttime", 
            birthday: new Date("2000-03-25")
        },
        {
            teacherId: "0000",
            firstName: "John",
            middleName: "Deer",
            lastName : "Doe",
            employment: "fulltime", 
            birthday: new Date("2005-11-06")
        },
      ]
    });

    // retrieve the teacher records
    const teachers = await caller.query("teacher.getAll");

    expect(teachers).toEqual([
      {
          id: teachers[0]?.id,
          teacherId: "1234",
          firstName: "King",
          middleName: "Voo",
          lastName : "Doo",
          employment: "parttime", 
          birthday: new Date("2000-03-25"),
          createdAt: teachers[0]?.createdAt,
          updatedAt: teachers[0]?.updatedAt,
      },
      {
          id: teachers[1]?.id,
          teacherId: "0000",
          firstName: "John",
          middleName: "Deer",
          lastName : "Doe",
          employment: "fulltime", 
          birthday: new Date("2005-11-06"),
          createdAt: teachers[1]?.createdAt,
          updatedAt: teachers[1]?.updatedAt,
      },
    ]);
  });
  /**
   * test get 
   */
    test("test query 'get' to retrieve a record", async () => {
        ctx = await createUserSession();

        const caller = appRouter.createCaller(ctx);

        const testData = 
        [
          {
              teacherId: "1234",
              firstName: "King",
              middleName: "Voo",
              lastName : "Doo",
              employment: "parttime", 
              birthday: new Date("2000-03-25")
          },
          {
              teacherId: "0000",
              firstName: "John",
              middleName: "Deer",
              lastName : "Doe",
              employment: "fulltime", 
              birthday: new Date("2005-11-06")
          },
        ]
        await ctx.prisma.teacher.createMany({
        data: testData
        });

        // retrieve the teacher record
        const teacher = await caller.query("teacher.get", {
            teacherId: "1234" 
        });
        expect(teacher).toEqual({
            id: teacher?.id,
            teacherId: "1234",
            firstName: "King",
            middleName: "Voo",
            lastName : "Doo",
            employment: "parttime", 
            birthday: new Date("2000-03-25"),
            createdAt: teacher?.createdAt,
            updatedAt: teacher?.updatedAt,
        });
    });

  /**
   * test add 
   */
    test("test query 'add' to create a teacher record", async () => {
      ctx = await createUserSession();

      const caller = appRouter.createCaller(ctx);
      
      // add a teacher record
      await caller.mutation("teacher.add", {
        teacherId: "0520",
        firstName: "Gray",
        middleName: "R",
        lastName: "Rabit",
        employment: "parttime",
        birthday: new Date("1999-05-20")
      });
      // retrieve the teacher record
        const teacher = await caller.query("teacher.get", {
          teacherId: "0520" 
        });
        expect(teacher).toEqual({
          id: teacher?.id,
          teacherId: "0520",
          firstName: "Gray",
          middleName: "R",
          lastName: "Rabit",
          employment: "parttime",
          birthday: new Date("1999-05-20"),
          createdAt: teacher?.createdAt,
          updatedAt: teacher?.updatedAt,
        });
  });
  /**
   * test update 
   */
  test("test query 'update' to update a teacher record", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    const testData =  
    {
      teacherId: "0520",
      firstName: "Gray",
      middleName: "R",
      lastName: "Rabit",
      employment: "parttime",
      birthday: new Date("1999-05-20")
    }
    // add a teacher record
    await caller.mutation("teacher.add", testData);
    // retrieve the teacher record
    const oldData = await caller.query("teacher.get", { 
      teacherId: "0520"
    });
    // update a teacher record
    await caller.mutation("teacher.update", {
      id: oldData?.id,
      teacherId: "0413",
      firstName: "White",
      middleName: "Rabbit",
      lastName: "Furr",
      employment: "fulltime",
      birthday: new Date("1999-04-13")
    });
    // retrieve the updated teacher records
      const updated = await caller.query("teacher.get", {
        teacherId: "0413"
      });
      expect(updated).toEqual({
        id: oldData?.id,
        teacherId: "0413",
        firstName: "White",
        middleName: "Rabbit",
        lastName: "Furr",
        employment: "fulltime",
        birthday: new Date("1999-04-13"),
        createdAt: oldData?.createdAt,
        updatedAt: updated?.updatedAt,
      });
    });
  /**
   * test delete 
   */
  test("test query 'delete' to remove a teacher record", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    const testData =  
    {
      teacherId: "0520",
      firstName: "Gray",
      middleName: "R",
      lastName: "Rabit",
      employment: "parttime",
      birthday: new Date("1999-05-20")
    }
    // add a teacher record
    await caller.mutation("teacher.add", testData);
    // deleta a teacher record
    await caller.mutation("teacher.delete", {
      teacherId: "0520" 
    });
    // retrieve the teacher records
      const teachers = await caller.query("teacher.getAll");
      expect(teachers).toEqual([]);
    })
});