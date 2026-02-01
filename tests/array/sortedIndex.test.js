import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedIndex,
} from "../../dist/index.js";

describe("sortedIndex function", () => {
  it("should return insertion index", () => {
    expect(sortedIndex([30, 50], 40)).toBe(1);
  });

  it("should handle duplicates", () => {
    expect(sortedIndex([4, 5, 5, 5, 6], 5)).toBe(1);
  });

  it("should handle empty array", () => {
    expect(sortedIndex([], 1)).toBe(0);
  });

  it("should handle non-array input", () => {
    expect(sortedIndex(null, 1)).toBe(0);
    expect(sortedIndex(undefined, 1)).toBe(0);
    expect(sortedIndex({ a: 1 }, 1)).toBe(0);
  });
});
