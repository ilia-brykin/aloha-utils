import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  dropRight,
} from "../../dist/index.js";

describe("dropRight function", () => {
  it("should drop one element by default", () => {
    expect(dropRight([1, 2, 3])).toEqual([1, 2]);
  });

  it("should drop n elements", () => {
    expect(dropRight([1, 2, 3], 2)).toEqual([1]);
  });

  it("should return empty array when n exceeds length", () => {
    expect(dropRight([1, 2, 3], 5)).toEqual([]);
  });

  it("should return a copy when n is 0", () => {
    const array = [1, 2, 3];
    const result = dropRight(array, 0);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });

  it("should handle negative n", () => {
    expect(dropRight([1, 2, 3], -2)).toEqual([1, 2, 3]);
  });

  it("should handle fractional n", () => {
    expect(dropRight([1, 2, 3], 1.9)).toEqual([1, 2]);
  });

  it("should handle non-array input", () => {
    expect(dropRight(null, 2)).toEqual([]);
    expect(dropRight(undefined, 2)).toEqual([]);
    expect(dropRight({ a: 1 }, 2)).toEqual([]);
  });
});
