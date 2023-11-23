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

describe("the user route", () => {
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
   * test getAll admin accounts
   */
  test("query admin account", async () => {
    ctx = await createUserSession();

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
          role: "user"
        },
      ]
    });

    // get the user records
    const users = await ctx.prisma.user.findMany({
        where: {
            role: "admin"
          }
    });
    console.log(users)
    expect(users).toMatchObject([{
        id: users[0].id,
        name: users[0].name,
        email: users[0].email,
        emailVerified: users[0].emailVerified,
        image: users[0].image,
        role: "admin"
    },
    {
        id: "1",
        name: null,
        email: "johndoe@email.com",
        emailVerified: null,
        image: null,
        role: "admin"
    }
    ]);
  });

      /**
   * test deleteUser admin account
   */
      test("delete user account", async () => {
        ctx = await createUserSession();
    
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
              role: "user"
            },
          ]
        });
        // delete the user record
        const input = { email: "johndoe@email.com"}
        await ctx.prisma.user.delete({
            where: {
              email: input.email
            }
        });
         // get the user records
         const users = await ctx.prisma.user.findMany({
            where: {
                role: "admin"
              }
        });
        console.log(users)
        expect(users).toMatchObject([{
            id: users[0].id,
            name: users[0].name,
            email: users[0].email,
            emailVerified: users[0].emailVerified,
            image: users[0].image,
            role: "admin"
        }]);
    })

    /**
   * test setAdmin user account
   */
    test("give admin previleges to the user account", async () => {
        ctx = await createUserSession();
    
        await ctx.prisma.user.createMany({
          data: [
            {
            id: "2",
              name: null,
              email: "johndoe2@email.com",
              emailVerified: null,
              image: null,
              role: "user"
            },
          ]
        });
        // update the user record
        const input = { email: "johndoe2@email.com"}
        await ctx.prisma.user.update({
            where: {
              email: input.email
            },
            data: {
              role: "admin"
            }
        });
         // get the user record
         const user = await ctx.prisma.user.findUnique({
            where: {
                email: "johndoe2@email.com"
              }
        });
        console.log(user)
        expect(user).toMatchObject({
            id: "2",
            name: null,
            email: "johndoe2@email.com",
            emailVerified: null,
            image: null,
            role: "admin"
        });
    })
});
