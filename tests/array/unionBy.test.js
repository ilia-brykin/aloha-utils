import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  unionBy,
} from "../../dist/index.js";

describe("unionBy function", () => {
  it("should combine unique values by iteratee", () => {
    expect(unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });

  it("should support property iteratee shorthand", () => {
    const result = unionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x");
    expect(result).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it("should preserve first occurrence across arrays", () => {
    const obj = { x: 1 };
    const result = unionBy([obj], [{ x: 1 }, { x: 2 }], "x");
    expect(result[0]).toBe(obj);
    expect(result).toEqual([obj, { x: 2 }]);
  });

  it("should use identity when iteratee omitted", () => {
    expect(unionBy([1, 2], [2, 3])).toEqual([1, 2, 3]);
  });

  it("should handle empty arrays", () => {
    expect(unionBy([], [1, 2], Math.floor)).toEqual([1, 2]);
    expect(unionBy([1, 2], [], Math.floor)).toEqual([1, 2]);
  });

  it("should handle no arrays", () => {
    expect(unionBy()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(unionBy([1, 2], null, Math.floor)).toEqual([]);
    expect(unionBy(null, [1, 2], Math.floor)).toEqual([]);
  });
});
