import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  intersectionWith,
} from "../../dist/index.js";

describe("intersectionWith function", () => {
  it("should find intersection using comparator", () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    const result = intersectionWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
    expect(result).toEqual([{ x: 1, y: 2 }]);
  });

  it("should preserve order and references from first array", () => {
    const obj = { x: 1 };
    const result = intersectionWith([obj, { x: 2 }], [{ x: 1 }], (a, b) => a.x === b.x);
    expect(result).toEqual([obj]);
    expect(result[0]).toBe(obj);
  });

  it("should return unique values by comparator", () => {
    const result = intersectionWith([{ x: 1 }, { x: 1 }], [{ x: 1 }], (a, b) => a.x === b.x);
    expect(result).toEqual([{ x: 1 }]);
  });

  it("should fallback to SameValueZero when comparator omitted", () => {
    expect(intersectionWith([NaN, 1], [NaN, 2])).toEqual([NaN]);
  });

  it("should handle empty arrays", () => {
    expect(intersectionWith([], [1, 2], (a, b) => a === b)).toEqual([]);
    expect(intersectionWith([1, 2], [], (a, b) => a === b)).toEqual([]);
  });

  it("should handle no arrays", () => {
    expect(intersectionWith()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(intersectionWith([1, 2], null, (a, b) => a === b)).toEqual([]);
    expect(intersectionWith(null, [1, 2], (a, b) => a === b)).toEqual([]);
  });
});
