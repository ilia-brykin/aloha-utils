import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  take,
} from "../../dist/index.js";

describe("take function", () => {
  it("should take one element by default", () => {
    expect(take([1, 2, 3])).toEqual([1]);
  });

  it("should take n elements", () => {
    expect(take([1, 2, 3], 2)).toEqual([1, 2]);
  });

  it("should handle n greater than length", () => {
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it("should handle n of 0", () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
  });

  it("should handle negative n", () => {
    expect(take([1, 2, 3], -1)).toEqual([]);
  });

  it("should handle fractional n", () => {
    expect(take([1, 2, 3], 1.9)).toEqual([1]);
  });

  it("should handle empty array", () => {
    expect(take([], 2)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(take(null, 2)).toEqual([]);
    expect(take(undefined, 2)).toEqual([]);
    expect(take({ a: 1 }, 2)).toEqual([]);
  });
});
