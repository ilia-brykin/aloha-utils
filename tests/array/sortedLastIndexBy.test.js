import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedLastIndexBy,
} from "../../dist/index.js";

describe("sortedLastIndexBy function", () => {
  it("should return highest insertion index by iteratee", () => {
    const objects = [{ x: 4 }, { x: 5 }];
    expect(sortedLastIndexBy(objects, { x: 4 }, o => o.x)).toBe(1);
  });

  it("should support property iteratee shorthand", () => {
    const objects = [{ x: 4 }, { x: 5 }];
    expect(sortedLastIndexBy(objects, { x: 4 }, "x")).toBe(1);
  });

  it("should handle empty array", () => {
    expect(sortedLastIndexBy([], 1, Math.floor)).toBe(0);
  });

  it("should handle non-array input", () => {
    expect(sortedLastIndexBy(null, 1, Math.floor)).toBe(0);
    expect(sortedLastIndexBy(undefined, 1, Math.floor)).toBe(0);
    expect(sortedLastIndexBy({ a: 1 }, 1, Math.floor)).toBe(0);
  });
});
