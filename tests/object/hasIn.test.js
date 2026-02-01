import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  hasIn,
} from "../../dist/index.js";

describe("hasIn function", () => {
  it("checks for own and inherited property path", () => {
    const object = Object.create({ a: { b: 2 } });
    expect(hasIn(object, "a")).toBe(true);
    expect(hasIn(object, "a.b")).toBe(true);
    expect(hasIn(object, ["a", "b"])).toBe(true);
  });

  it("returns false for missing paths", () => {
    const object = { a: { b: 2 } };
    expect(hasIn(object, "a.c")).toBe(false);
  });
});
