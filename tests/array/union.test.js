import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  union,
} from "../../dist/index.js";

describe("union function", () => {
  it("should combine unique values", () => {
    expect(union([2], [1, 2])).toEqual([2, 1]);
  });

  it("should preserve order from first occurrence", () => {
    expect(union([1, 2], [2, 3], [3, 1, 4])).toEqual([1, 2, 3, 4]);
  });

  it("should use SameValueZero comparisons", () => {
    expect(union([NaN, 1], [NaN, 2])).toEqual([NaN, 1, 2]);
  });

  it("should handle empty arrays", () => {
    expect(union([], [1, 2])).toEqual([1, 2]);
    expect(union([1, 2], [])).toEqual([1, 2]);
  });

  it("should handle no arrays", () => {
    expect(union()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(union([1, 2], null)).toEqual([]);
    expect(union(null, [1, 2])).toEqual([]);
  });
});
