import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  unset,
} from "../../dist/index.js";

describe("unset function", () => {
  it("removes property at path", () => {
    const object = { a: [{ b: { c: 7 } }] };
    expect(unset(object, "a[0].b.c")).toBe(true);
    expect(object).toEqual({ a: [{ b: {} }] });
  });

  it("returns true for missing paths", () => {
    const object = { a: 1 };
    expect(unset(object, "a.b")).toBe(true);
  });
});
