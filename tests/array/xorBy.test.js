import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  xorBy,
} from "../../dist/index.js";

describe("xorBy function", () => {
  it("should return symmetric difference by iteratee", () => {
    expect(xorBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2, 3.4]);
  });

  it("should support property iteratee shorthand", () => {
    const result = xorBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x");
    expect(result).toEqual([{ x: 2 }]);
  });

  it("should use identity when iteratee omitted", () => {
    expect(xorBy([1, 2], [2, 3])).toEqual([1, 3]);
  });

  it("should handle empty arrays", () => {
    expect(xorBy([], [1, 2], Math.floor)).toEqual([1, 2]);
    expect(xorBy([1, 2], [], Math.floor)).toEqual([1, 2]);
  });

  it("should handle no arrays", () => {
    expect(xorBy()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(xorBy([1, 2], null, Math.floor)).toEqual([]);
    expect(xorBy(null, [1, 2], Math.floor)).toEqual([]);
  });
});
