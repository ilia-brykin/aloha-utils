import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  differenceWith,
} from "../../dist/index.js";

describe("differenceWith function", () => {
  it("should compute difference with comparator", () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const result = differenceWith(objects, [{ x: 1, y: 2 }], (a, b) => (
      a.x === b.x && a.y === b.y
    ));
    expect(result).toEqual([{ x: 2, y: 1 }]);
  });

  it("should preserve order and references", () => {
    const obj = { x: 1 };
    const arr = [obj, { x: 2 }];
    const result = differenceWith(arr, [{ x: 2 }], (a, b) => a.x === b.x);
    expect(result).toEqual([obj]);
    expect(result[0]).toBe(obj);
  });

  it("should handle multiple values arrays", () => {
    const result = differenceWith(
      [{ x: 1 }, { x: 2 }, { x: 3 }],
      [{ x: 1 }],
      [{ x: 3 }],
      (a, b) => a.x === b.x,
    );
    expect(result).toEqual([{ x: 2 }]);
  });

  it("should fallback to SameValueZero when no comparator", () => {
    expect(differenceWith([NaN, 1], [NaN])).toEqual([1]);
    expect(differenceWith([0, -0, 1], [-0])).toEqual([1]);
  });

  it("should return copy when no values provided", () => {
    const arr = [1, 2];
    const result = differenceWith(arr);
    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(arr);
  });

  it("should handle empty input", () => {
    expect(differenceWith([], [1], (a, b) => a === b)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(differenceWith(null, [1], (a, b) => a === b)).toEqual([]);
    expect(differenceWith(undefined, [1], (a, b) => a === b)).toEqual([]);
    expect(differenceWith({ a: 1 }, [1], (a, b) => a === b)).toEqual([]);
  });
});
