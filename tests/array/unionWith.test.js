import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  unionWith,
} from "../../dist/index.js";

describe("unionWith function", () => {
  it("should combine values using comparator", () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    const result = unionWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
    expect(result).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 1 }]);
  });

  it("should preserve first occurrence across arrays", () => {
    const obj = { x: 1 };
    const result = unionWith([obj], [{ x: 1 }, { x: 2 }], (a, b) => a.x === b.x);
    expect(result[0]).toBe(obj);
    expect(result).toEqual([obj, { x: 2 }]);
  });

  it("should fallback to SameValueZero when comparator omitted", () => {
    expect(unionWith([NaN, 1], [NaN, 2])).toEqual([NaN, 1, 2]);
  });

  it("should handle empty arrays", () => {
    expect(unionWith([], [1, 2], (a, b) => a === b)).toEqual([1, 2]);
    expect(unionWith([1, 2], [], (a, b) => a === b)).toEqual([1, 2]);
  });

  it("should handle no arrays", () => {
    expect(unionWith()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(unionWith([1, 2], null, (a, b) => a === b)).toEqual([]);
    expect(unionWith(null, [1, 2], (a, b) => a === b)).toEqual([]);
  });
});
