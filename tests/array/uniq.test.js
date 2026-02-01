import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  uniq,
} from "../../dist/index.js";

describe("uniq function", () => {
  it("should remove duplicates", () => {
    expect(uniq([2, 1, 2])).toEqual([2, 1]);
  });

  it("should preserve order", () => {
    expect(uniq([1, 2, 1, 3, 2])).toEqual([1, 2, 3]);
  });

  it("should use SameValueZero comparisons", () => {
    expect(uniq([NaN, NaN, 1])).toEqual([NaN, 1]);
  });

  it("should handle empty array", () => {
    expect(uniq([])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(uniq(null)).toEqual([]);
    expect(uniq(undefined)).toEqual([]);
    expect(uniq({ a: 1 })).toEqual([]);
  });
});
