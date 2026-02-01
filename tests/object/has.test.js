import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  has,
} from "../../dist/index.js";

describe("has function", () => {
  it("checks for own property path", () => {
    const object = { a: { b: 2 } };
    expect(has(object, "a")).toBe(true);
    expect(has(object, "a.b")).toBe(true);
    expect(has(object, ["a", "b"])).toBe(true);
  });

  it("does not check inherited properties", () => {
    const object = Object.create({ a: { b: 2 } });
    expect(has(object, "a")).toBe(false);
  });

  it("returns false for missing paths", () => {
    const object = { a: { b: 2 } };
    expect(has(object, "a.c")).toBe(false);
  });
});
