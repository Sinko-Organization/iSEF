/**
 * Integration test example for the `example` router
 */
import { test, expect, describe } from "vitest";

import { createContextInner } from "./context";
import { appRouter } from "./index";
import { inferQueryInput } from "../../utils/trpc";

/**
 * Create a test context for the `example` router
 */
describe("example router", () => {
  /**
   * Test the `hello` query
   */
  test("hello endpoint", async () => {
    const ctx = await createContextInner({
      session: null,
    });
    const caller = appRouter.createCaller(ctx);

    const input: inferQueryInput<"example.hello"> = {
      text: "test",
    };

    const result = await caller.query("example.hello", input);

    expect(result).toEqual({
      greeting: "Hello test",
    });
  });

  /**
   * Test the `getAll` query
   */
  test("get all endpoint", async () => {
    const ctx = await createContextInner({
      session: null,
    });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.query("example.getAll");

    expect(result).toEqual([]);
  });
});
