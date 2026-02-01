import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedLastIndex,
} from "../../dist/index.js";

describe("sortedLastIndex function", () => {
  it("should return highest insertion index", () => {
    expect(sortedLastIndex([4, 5, 5, 5, 6], 5)).toBe(4);
  });

  it("should handle duplicates", () => {
    expect(sortedLastIndex([1, 1, 1], 1)).toBe(3);
  });

  it("should handle empty array", () => {
    expect(sortedLastIndex([], 1)).toBe(0);
  });

  it("should handle non-array input", () => {
    expect(sortedLastIndex(null, 1)).toBe(0);
    expect(sortedLastIndex(undefined, 1)).toBe(0);
    expect(sortedLastIndex({ a: 1 }, 1)).toBe(0);
  });
});
