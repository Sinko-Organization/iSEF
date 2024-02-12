/**
 * Integration test example for the `user` router
 */
import { appRouter } from "@web-app/server/router";
import {
  createContextInner,
  createUserSession,
} from "@web-app/server/router/context";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

/**
 * Create a test context for the user router
 */

describe("testing the userRoute", () => {
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
   * test getAll subjects
   */
  test("test query 'getAll' to retrieve all subjects", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    await ctx.prisma.subject.createMany({
      data: [
        {
          courseId: '1',
          name: 'sub1',
          stubCode: 's01',
          curriculum: '2018-2020',
          units: 3,
          credits: 3,
        },
        {
          courseId: '3',
          name: 'sub2',
          stubCode: 's02',
          curriculum: '2018-2021',
          units: 3,
          credits: 3,
        },
      ]
    });

    // retrieve the subjects
    const subjects = await caller.query("subject.getAll");
    expect(subjects).toEqual([{
        id: subjects[0]?.id,
        courseId: '1',
        name: 'sub1',
        stubCode: 's01',
        curriculum: '2018-2020',
        units: 3,
        credits: 3,
        createdAt: subjects[0]?.createdAt,
        updatedAt: subjects[0]?.updatedAt,
    },
    {   
        id: subjects[1]?.id,
        courseId: '3',
        name: 'sub2',
        stubCode: 's02',
        curriculum: '2018-2021',
        units: 3,
        credits: 3,
        createdAt: subjects[0]?.createdAt,
        updatedAt: subjects[0]?.updatedAt,
    }
    ]);
  });

  /**
   * test delete subject
   */
      test("test query 'delete' to delete a subject", async () => {
        ctx = await createUserSession();

        const caller = appRouter.createCaller(ctx);
    
        await ctx.prisma.subject.createMany({
          data: [
            {
              courseId: '1',
              name: 'sub1',
              stubCode: 's01',
              curriculum: '2018-2020',
              units: 3,
              credits: 3,
            },
            {
              courseId: '3',
              name: 'sub2',
              stubCode: 's02',
              curriculum: '2018-2021',
              units: 3,
              credits: 3,
            },
          ]
        });
        // delete the subject record
        await caller.mutation("subject.delete", {
          stubCode: "s01" 
        });
         // get the subject record
         const subjects = await caller.query("subject.getAll");
          expect(subjects).toEqual([{
            id: subjects[0]?.id,
            courseId: '3',
            name: 'sub2',
            stubCode: 's02',
            curriculum: '2018-2021',
            units: 3,
            credits: 3,
            createdAt: subjects[0]?.createdAt,
            updatedAt: subjects[0]?.updatedAt,
          }
        ]);
      })

    /**
   * test add 
   */
    test("test query 'add' to create a subject record", async () => {
      ctx = await createUserSession();

      const caller = appRouter.createCaller(ctx);
      
      // add a subject record
      await caller.mutation("subject.add", {
        courseId: '3',
        name: 'sub2',
        stubCode: 's02',
        curriculum: '2018-2021',
        units: 3,
        credits: 3,
      });
      // retrieve the subject record
      const subjects = await caller.query("subject.getAll");
      expect(subjects).toEqual([{
        id: subjects[0]?.id,
        courseId: '3',
        name: 'sub2',
        stubCode: 's02',
        curriculum: '2018-2021',
        units: 3,
        credits: 3,
        createdAt: subjects[0]?.createdAt,
        updatedAt: subjects[0]?.updatedAt,
      }
      ]);
    });

    /**
   * test update 
   */
  test("test query 'update' to update a subject record", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    // add a subject record
    await caller.mutation("subject.add", {
      courseId: '3',
      name: 'sub2',
      stubCode: 's02',
      curriculum: '2018-2021',
      units: 3,
      credits: 3,
    });
    // update a subject record
    await caller.mutation("subject.update", {
      courseId: '2',
      name: 'sub3',
      stubCode: 's03',
      curriculum: '2018-2022',
      units: 4,
      credits: 3,
    });
    // retrieve the updated subject records
      const updated = await caller.query("teacher.getAll");
      expect(updated).toEqual([{
        id: updated[0]?.id,
        courseId: '2',
        name: 'sub3',
        stubCode: 's03',
        curriculum: '2018-2022',
        units: 4,
        credits: 3,
        createdAt: updated[0]?.createdAt,
        updatedAt: updated[0]?.updatedAt,
      }
      ]);
    });
});