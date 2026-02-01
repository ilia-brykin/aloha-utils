import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  difference,
} from "../../dist/index.js";

describe("difference function", () => {
  it("should compute difference", () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
    expect(difference([1, 2, 3], [1, 2])).toEqual([3]);
  });

  it("should preserve order and references", () => {
    const obj = { a: 1 };
    const arr = [obj, 2, 3];
    const result = difference(arr, [2]);
    expect(result).toEqual([obj, 3]);
    expect(result[0]).toBe(obj);
  });

  it("should handle multiple values arrays", () => {
    expect(difference([1, 2, 3, 4], [1], [3], [5])).toEqual([2, 4]);
  });

  it("should use SameValueZero comparison", () => {
    expect(difference([NaN, 1], [NaN])).toEqual([1]);
    expect(difference([0, -0, 1], [-0])).toEqual([1]);
  });

  it("should return copy when no values provided", () => {
    const arr = [1, 2];
    const result = difference(arr);
    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(arr);
  });

  it("should handle empty input", () => {
    expect(difference([], [1, 2])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(difference(null, [1])).toEqual([]);
    expect(difference(undefined, [1])).toEqual([]);
    expect(difference({ a: 1 }, [1])).toEqual([]);
  });
});
