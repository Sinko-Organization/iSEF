/**
 * Integration test example for the `example` router
 */
import { afterEach, describe, expect, test } from "vitest";

import { createContextInner, createUserSession } from "../context";
import { appRouter } from "../index";

/**
 * Create a test context for the course router
 */
describe("course router", () => {
  /**
   * Clean up the database after each test
   */
  afterEach(async () => {
    const ctx = await createContextInner({
      session: null,
    });

    await ctx.prisma.course.deleteMany();
    await ctx.prisma.user.deleteMany();
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
   * returns the correct population
   */

  test("returns the correct population", async () => {
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
    const result = await caller.query("course.population");

    expect(result).toEqual(3);
  });

  /**
   * course that must have no population
   */

  test("course that must have no population", async () => {
    const ctx = await createUserSession();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.query("course.population");

    expect(result).toEqual(0);
  });
});
