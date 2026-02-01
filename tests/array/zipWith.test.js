import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  zipWith,
} from "../../dist/index.js";

describe("zipWith function", () => {
  it("should group elements using iteratee", () => {
    const result = zipWith([1, 2], [10, 20], [100, 200], (a, b, c) => a + b + c);
    expect(result).toEqual([111, 222]);
  });

  it("should fall back to zip when iteratee omitted", () => {
    const result = zipWith(["a", "b"], [1, 2]);
    expect(result).toEqual([["a", 1], ["b", 2]]);
  });

  it("should handle arrays of different lengths", () => {
    const result = zipWith([1], [10, 20], (a, b) => (a ?? 0) + (b ?? 0));
    expect(result).toEqual([11, 20]);
  });

  it("should handle empty arrays", () => {
    expect(zipWith([], [], (a, b) => a ?? b)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(zipWith([1], null, (a, b) => a ?? b)).toEqual([]);
    expect(zipWith(null, [1], (a, b) => a ?? b)).toEqual([]);
  });
});
