import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedIndexOf,
} from "../../dist/index.js";

describe("sortedIndexOf function", () => {
  it("should find the first occurrence in sorted array", () => {
    expect(sortedIndexOf([4, 5, 5, 5, 6], 5)).toBe(1);
  });

  it("should return -1 when not found", () => {
    expect(sortedIndexOf([1, 2, 3], 4)).toBe(-1);
  });

  it("should handle empty array", () => {
    expect(sortedIndexOf([], 1)).toBe(-1);
  });

  it("should handle non-array input", () => {
    expect(sortedIndexOf(null, 1)).toBe(-1);
    expect(sortedIndexOf(undefined, 1)).toBe(-1);
    expect(sortedIndexOf({ a: 1 }, 1)).toBe(-1);
  });
});
