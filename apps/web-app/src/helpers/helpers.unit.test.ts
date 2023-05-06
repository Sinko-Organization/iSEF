import { describe, expect, it } from "vitest";

import { toNumericGrade } from "./toNumericGrade";

describe("to-numeric-grade function", () => {
  it("returns a number from 0 to 5", () => {
    expect(toNumericGrade("INC")).toBe(0);
    expect(toNumericGrade("3")).toBe(3);
    expect(toNumericGrade("5.5")).toBe(0);
  });
});
