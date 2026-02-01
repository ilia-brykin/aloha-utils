import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  indexOf,
} from "../../dist/index.js";

describe("indexOf function", () => {
  it("should find the first occurrence", () => {
    expect(indexOf([1, 2, 1, 2], 2)).toBe(1);
  });

  it("should search from fromIndex", () => {
    expect(indexOf([1, 2, 1, 2], 2, 2)).toBe(3);
  });

  it("should handle negative fromIndex", () => {
    expect(indexOf([1, 2, 1, 2], 2, -2)).toBe(3);
  });

  it("should handle fromIndex beyond length", () => {
    expect(indexOf([1, 2], 1, 5)).toBe(-1);
  });

  it("should handle fractional fromIndex", () => {
    expect(indexOf([1, 2, 3], 2, 1.9)).toBe(1);
  });

  it("should use SameValueZero comparisons", () => {
    expect(indexOf([NaN, 1], NaN)).toBe(0);
  });

  it("should return -1 when not found", () => {
    expect(indexOf([1, 2, 3], 4)).toBe(-1);
  });

  it("should handle empty array", () => {
    expect(indexOf([], 1)).toBe(-1);
  });

  it("should handle non-array input", () => {
    expect(indexOf(null, 1)).toBe(-1);
    expect(indexOf(undefined, 1)).toBe(-1);
    expect(indexOf({ a: 1 }, 1)).toBe(-1);
  });
});
