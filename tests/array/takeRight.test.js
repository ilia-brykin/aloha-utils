import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  takeRight,
} from "../../dist/index.js";

describe("takeRight function", () => {
  it("should take one element by default", () => {
    expect(takeRight([1, 2, 3])).toEqual([3]);
  });

  it("should take n elements", () => {
    expect(takeRight([1, 2, 3], 2)).toEqual([2, 3]);
  });

  it("should handle n greater than length", () => {
    expect(takeRight([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it("should handle n of 0", () => {
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
  });

  it("should handle negative n", () => {
    expect(takeRight([1, 2, 3], -1)).toEqual([]);
  });

  it("should handle fractional n", () => {
    expect(takeRight([1, 2, 3], 1.9)).toEqual([3]);
  });

  it("should handle empty array", () => {
    expect(takeRight([], 2)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(takeRight(null, 2)).toEqual([]);
    expect(takeRight(undefined, 2)).toEqual([]);
    expect(takeRight({ a: 1 }, 2)).toEqual([]);
  });
});
