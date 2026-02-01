import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  lastIndexOf,
} from "../../dist/index.js";

describe("lastIndexOf function", () => {
  it("should find the last occurrence", () => {
    expect(lastIndexOf([1, 2, 1, 2], 2)).toBe(3);
  });

  it("should search from fromIndex", () => {
    expect(lastIndexOf([1, 2, 1, 2], 2, 2)).toBe(1);
  });

  it("should handle negative fromIndex", () => {
    expect(lastIndexOf([1, 2, 1, 2], 2, -2)).toBe(1);
  });

  it("should handle fromIndex beyond length", () => {
    expect(lastIndexOf([1, 2], 1, 5)).toBe(0);
  });

  it("should handle fractional fromIndex", () => {
    expect(lastIndexOf([1, 2, 3], 2, 1.9)).toBe(1);
  });

  it("should use SameValueZero comparisons", () => {
    expect(lastIndexOf([1, NaN], NaN)).toBe(1);
  });

  it("should return -1 when not found", () => {
    expect(lastIndexOf([1, 2, 3], 4)).toBe(-1);
  });

  it("should handle empty array", () => {
    expect(lastIndexOf([], 1)).toBe(-1);
  });

  it("should handle non-array input", () => {
    expect(lastIndexOf(null, 1)).toBe(-1);
    expect(lastIndexOf(undefined, 1)).toBe(-1);
    expect(lastIndexOf({ a: 1 }, 1)).toBe(-1);
  });
});
