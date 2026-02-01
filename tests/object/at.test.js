import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  at,
} from "../../dist/index.js";

describe("at function", () => {
  const object = { a: [{ b: { c: 3 } }, 4], x: { y: 5 } };

  it("picks values for an array of paths", () => {
    expect(at(object, ["a[0].b.c", "a[1]"])).toEqual([3, 4]);
  });

  it("accepts paths as separate arguments", () => {
    expect(at(object, "a[0].b.c", "x.y")).toEqual([3, 5]);
  });

  it("supports array paths", () => {
    expect(at(object, ["a", "0", "b", "c"], ["x", "y"])).toEqual([3, 5]);
  });

  it("returns empty array with no paths", () => {
    expect(at(object)).toEqual([]);
  });
});
