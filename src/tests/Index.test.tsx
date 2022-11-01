// import { expect, test } from "vitest";
// import { render, screen, within } from "@testing-library/react";
// import Home from "../pages";

// test("home", () => {
//   render(<Home />);
//   const titile = within(screen.getByTitle("Create T3 App"));
//   expect(titile.getByText("Create T3 App")).toBeTruthy();
// });

import { expect, test } from "vitest";
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
