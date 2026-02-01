import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  differenceBy,
} from "../../dist/index.js";

describe("differenceBy function", () => {
  it("should compute difference by iteratee", () => {
    expect(differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1.2]);
  });

  it("should support property iteratee", () => {
    expect(differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], "x"))
      .toEqual([{ x: 2 }]);
  });

  it("should handle multiple values arrays", () => {
    expect(differenceBy([1.1, 2.2, 3.3], [[1.9], [3.1]], Math.floor)).toEqual([2.2]);
  });

  it("should preserve order and references", () => {
    const obj = { x: 1 };
    const arr = [obj, { x: 2 }];
    const result = differenceBy(arr, [{ x: 1 }], "x");
    expect(result).toEqual([{ x: 2 }]);
    expect(result[0]).toBe(arr[1]);
  });

  it("should handle NaN criteria", () => {
    const result = differenceBy([NaN, 1], [NaN], value => value);
    expect(result).toEqual([1]);
  });

  it("should return copy when no values provided", () => {
    const arr = [1, 2];
    const result = differenceBy(arr);
    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(arr);
  });

  it("should handle empty input", () => {
    expect(differenceBy([], [1], Math.floor)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(differenceBy(null, [1], Math.floor)).toEqual([]);
    expect(differenceBy(undefined, [1], Math.floor)).toEqual([]);
    expect(differenceBy({ a: 1 }, [1], Math.floor)).toEqual([]);
  });
});
