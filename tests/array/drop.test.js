import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  drop,
} from "../../dist/index.js";

describe("drop function", () => {
  it("should drop one element by default", () => {
    expect(drop([1, 2, 3])).toEqual([2, 3]);
  });

  it("should drop n elements", () => {
    expect(drop([1, 2, 3], 2)).toEqual([3]);
  });

  it("should return empty array when n exceeds length", () => {
    expect(drop([1, 2, 3], 5)).toEqual([]);
  });

  it("should return a copy when n is 0", () => {
    const array = [1, 2, 3];
    const result = drop(array, 0);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });

  it("should handle negative n", () => {
    expect(drop([1, 2, 3], -2)).toEqual([1, 2, 3]);
  });

  it("should handle fractional n", () => {
    expect(drop([1, 2, 3], 1.9)).toEqual([2, 3]);
  });

  it("should handle non-array input", () => {
    expect(drop(null, 2)).toEqual([]);
    expect(drop(undefined, 2)).toEqual([]);
    expect(drop({ a: 1 }, 2)).toEqual([]);
  });
});
