import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedLastIndexOf,
} from "../../dist/index.js";

describe("sortedLastIndexOf function", () => {
  it("should find the last occurrence in sorted array", () => {
    expect(sortedLastIndexOf([4, 5, 5, 5, 6], 5)).toBe(3);
  });

  it("should return -1 when not found", () => {
    expect(sortedLastIndexOf([1, 2, 3], 4)).toBe(-1);
  });

  it("should handle empty array", () => {
    expect(sortedLastIndexOf([], 1)).toBe(-1);
  });

  it("should handle non-array input", () => {
    expect(sortedLastIndexOf(null, 1)).toBe(-1);
    expect(sortedLastIndexOf(undefined, 1)).toBe(-1);
    expect(sortedLastIndexOf({ a: 1 }, 1)).toBe(-1);
  });
});
