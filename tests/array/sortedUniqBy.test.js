import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedUniqBy,
} from "../../dist/index.js";

describe("sortedUniqBy function", () => {
  it("should remove duplicates by iteratee", () => {
    const result = sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
    expect(result).toEqual([1.1, 2.3]);
  });

  it("should support property iteratee shorthand", () => {
    const result = sortedUniqBy([{ x: 1 }, { x: 1 }, { x: 2 }], "x");
    expect(result).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it("should handle empty array", () => {
    expect(sortedUniqBy([], Math.floor)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(sortedUniqBy(null, Math.floor)).toEqual([]);
    expect(sortedUniqBy(undefined, Math.floor)).toEqual([]);
    expect(sortedUniqBy({ a: 1 }, Math.floor)).toEqual([]);
  });
});
