import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedIndexBy,
} from "../../dist/index.js";

describe("sortedIndexBy function", () => {
  it("should return insertion index by iteratee", () => {
    const objects = [{ x: 4 }, { x: 5 }];
    expect(sortedIndexBy(objects, { x: 4 }, o => o.x)).toBe(0);
  });

  it("should support property iteratee shorthand", () => {
    const objects = [{ x: 4 }, { x: 5 }];
    expect(sortedIndexBy(objects, { x: 4 }, "x")).toBe(0);
  });

  it("should handle empty array", () => {
    expect(sortedIndexBy([], 1, Math.floor)).toBe(0);
  });

  it("should handle non-array input", () => {
    expect(sortedIndexBy(null, 1, Math.floor)).toBe(0);
    expect(sortedIndexBy(undefined, 1, Math.floor)).toBe(0);
    expect(sortedIndexBy({ a: 1 }, 1, Math.floor)).toBe(0);
  });
});
