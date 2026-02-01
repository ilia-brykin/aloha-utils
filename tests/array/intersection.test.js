import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  intersection,
} from "../../dist/index.js";

describe("intersection function", () => {
  it("should find intersection of arrays", () => {
    expect(intersection([2, 1], [2, 3])).toEqual([2]);
  });

  it("should preserve order and references from first array", () => {
    const obj = { a: 1 };
    const result = intersection([obj, 2, 3], [3, obj], [obj, 4]);
    expect(result).toEqual([obj]);
    expect(result[0]).toBe(obj);
  });

  it("should return unique values", () => {
    expect(intersection([1, 2, 2, 3], [2, 2, 4], [2])).toEqual([2]);
  });

  it("should use SameValueZero comparisons", () => {
    expect(intersection([NaN, 1], [NaN, 2])).toEqual([NaN]);
  });

  it("should handle empty arrays", () => {
    expect(intersection([], [1, 2])).toEqual([]);
    expect(intersection([1, 2], [])).toEqual([]);
  });

  it("should handle no arrays", () => {
    expect(intersection()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(intersection([1, 2], null)).toEqual([]);
    expect(intersection(null, [1, 2])).toEqual([]);
  });
});
