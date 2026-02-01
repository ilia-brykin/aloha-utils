import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  without,
} from "../../dist/index.js";

describe("without function", () => {
  it("should exclude given values", () => {
    expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
  });

  it("should use SameValueZero comparisons", () => {
    expect(without([NaN, 1], NaN)).toEqual([1]);
  });

  it("should return copy when no values provided", () => {
    const array = [1, 2, 3];
    const result = without(array);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });

  it("should handle empty array", () => {
    expect(without([], 1)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(without(null, 1)).toEqual([]);
    expect(without(undefined, 1)).toEqual([]);
    expect(without({ a: 1 }, 1)).toEqual([]);
  });
});
