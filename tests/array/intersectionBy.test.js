import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  intersectionBy,
} from "../../dist/index.js";

describe("intersectionBy function", () => {
  it("should find intersection by iteratee", () => {
    expect(intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1]);
  });

  it("should support property iteratee shorthand", () => {
    const result = intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x");
    expect(result).toEqual([{ x: 1 }]);
  });

  it("should preserve order and references from first array", () => {
    const obj = { x: 2 };
    const result = intersectionBy([obj, { x: 1 }], [{ x: 2 }], "x");
    expect(result).toEqual([obj]);
    expect(result[0]).toBe(obj);
  });

  it("should return unique values by criterion", () => {
    const result = intersectionBy([2.1, 2.2, 3.1], [2.3, 3.4], Math.floor);
    expect(result).toEqual([2.1, 3.1]);
  });

  it("should use identity when iteratee omitted", () => {
    expect(intersectionBy([1, 2], [2, 3])).toEqual([2]);
  });

  it("should handle empty arrays", () => {
    expect(intersectionBy([], [1, 2], Math.floor)).toEqual([]);
    expect(intersectionBy([1, 2], [], Math.floor)).toEqual([]);
  });

  it("should handle no arrays", () => {
    expect(intersectionBy()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(intersectionBy([1, 2], null, Math.floor)).toEqual([]);
    expect(intersectionBy(null, [1, 2], Math.floor)).toEqual([]);
  });
});
