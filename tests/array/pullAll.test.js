import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pullAll,
} from "../../dist/index.js";

describe("pullAll function", () => {
  it("should remove values from array", () => {
    const array = ["a", "b", "c", "a", "b", "c"];
    const result = pullAll(array, ["a", "c"]);
    expect(array).toEqual(["b", "b"]);
    expect(result).toBe(array);
  });

  it("should handle empty values", () => {
    const array = [1, 2, 3];
    pullAll(array, []);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should use SameValueZero comparisons", () => {
    const array = [NaN, 0, -0, 1];
    pullAll(array, [NaN, -0]);
    expect(array).toEqual([1]);
  });

  it("should handle non-array input", () => {
    expect(pullAll(null, [1])).toEqual(null);
    expect(pullAll(undefined, [1])).toEqual(undefined);
  });
});
