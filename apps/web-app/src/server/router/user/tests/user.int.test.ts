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
   * test getAll user accounts
   */
  test("test query 'getAll' to retrieve all user accounts", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    await ctx.prisma.user.createMany({
      data: [
        {
          id: "1",
          name: null,
          email: "johndoe@email.com",
          emailVerified: null,
          image: null,
          role: "superadmin"
        },
        {
        id: "2",
          name: null,
          email: "johndoe2@email.com",
          emailVerified: null,
          image: null,
          role: "regular"
        },
      ]
    });

    // retrieve the user records
    const users = await caller.query("user.getAll");
    expect(users).toEqual([{
      name: "User",
      email: "user@website.com",
      role: "admin",
      createdAt: users[0]?.createdAt
    },
    {
      name: null,
      email: "johndoe2@email.com",
      role: "regular",
      createdAt: users[1]?.createdAt
    }
    ]);
  });

  /**
   * test getAllAdmin accounts
   */
  test("test query 'getAllAdmin' to retrieve all admin accounts", async () => {
    ctx = await createUserSession();

    const caller = appRouter.createCaller(ctx);

    await ctx.prisma.user.createMany({
      data: [
        {
          id: "1",
          name: null,
          email: "johndoe@email.com",
          emailVerified: null,
          image: null,
          role: "superadmin"
        },
        {
        id: "2",
          name: null,
          email: "johndoe2@email.com",
          emailVerified: null,
          image: null,
          role: "regular"
        },
      ]
    });

    // retrieve the user records
    const users = await caller.query("user.getAllAdmin");
    expect(users).toEqual([{
      name: "User",
      email: "user@website.com",
      role: "admin"
    }]);
  });

  /**
   * test deleteUser admin account
   */
      test("test query 'delete' to delete a user account", async () => {
        ctx = await createUserSession();

        const caller = appRouter.createCaller(ctx);
    
        await ctx.prisma.user.createMany({
          data: [
            {
              id: "1",
              name: null,
              email: "johndoe@email.com",
              emailVerified: null,
              image: null,
              role: "admin"
            },
            {
            id: "2",
              name: null,
              email: "johndoe2@email.com",
              emailVerified: null,
              image: null,
              role: null
            },
          ]
        });
        // delete the user record
        await caller.mutation("user.delete", {
          email: "johndoe@email.com" 
        });
         // get the user records
         const users = await caller.query("user.getAll");
          expect(users).toEqual([{
          name: "User",
          email: "user@website.com",
          role: "admin",
          createdAt: users[0]?.createdAt
          }
        ]);
    })

    /**
   * test setAdmin user account
   */
    test("test 'setAdmin' to give admin previleges to the user account", async () => {
        ctx = await createUserSession();

        const caller = appRouter.createCaller(ctx);
    
        await ctx.prisma.user.createMany({
          data: [
            {
            id: "2",
              name: null,
              email: "johndoe2@email.com",
              emailVerified: null,
              image: null,
              role: null
            },
          ]
        });
        // update the user record
        await caller.mutation("user.setAdmin", {
          email: "johndoe2@email.com" 
        });
         // get the user record
         const user = await ctx.prisma.user.findUnique({
            where: {
                email: "johndoe2@email.com"
              }
        });
        expect(user).toMatchObject({
            id: "2",
            name: null,
            email: "johndoe2@email.com",
            emailVerified: null,
            image: null,
            role: "admin"
        });
    })

     /**
   * test setNotAdmin user account
   */
     test("test 'setnotAdmin' to remove admin previleges to the user account", async () => {
      ctx = await createUserSession();

      const caller = appRouter.createCaller(ctx);
  
      await ctx.prisma.user.createMany({
        data: [
          {
          id: "2",
            name: null,
            email: "johndoe2@email.com",
            emailVerified: null,
            image: null,
            role: "admin"
          },
        ]
      });
      // update the user record
      await caller.mutation("user.setNotAdmin", {
        email: "johndoe2@email.com" 
      });
       // get the user record
       const user = await ctx.prisma.user.findUnique({
          where: {
              email: "johndoe2@email.com"
            }
      });
      expect(user).toMatchObject({
          id: "2",
          name: null,
          email: "johndoe2@email.com",
          emailVerified: null,
          image: null,
          role: "regular"
      });
  })
});
