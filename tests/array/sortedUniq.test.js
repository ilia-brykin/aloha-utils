import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortedUniq,
} from "../../dist/index.js";

describe("sortedUniq function", () => {
  it("should remove duplicates from sorted array", () => {
    expect(sortedUniq([1, 1, 2])).toEqual([1, 2]);
  });

  it("should preserve order", () => {
    expect(sortedUniq([1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
  });

  it("should handle NaN with SameValueZero", () => {
    expect(sortedUniq([NaN, NaN, 1])).toEqual([NaN, 1]);
  });

  it("should handle empty array", () => {
    expect(sortedUniq([])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(sortedUniq(null)).toEqual([]);
    expect(sortedUniq(undefined)).toEqual([]);
    expect(sortedUniq({ a: 1 })).toEqual([]);
  });
});
