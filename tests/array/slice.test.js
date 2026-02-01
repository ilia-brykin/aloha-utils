import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  slice,
} from "../../dist/index.js";

describe("slice function", () => {
  it("should slice array between start and end", () => {
    expect(slice([1, 2, 3, 4], 1, 3)).toEqual([2, 3]);
  });

  it("should use default start and end", () => {
    expect(slice([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("should handle negative start", () => {
    expect(slice([1, 2, 3, 4], -2)).toEqual([3, 4]);
  });

  it("should handle negative end", () => {
    expect(slice([1, 2, 3, 4], 0, -1)).toEqual([1, 2, 3]);
  });

  it("should return empty array when start >= end", () => {
    expect(slice([1, 2, 3], 2, 2)).toEqual([]);
    expect(slice([1, 2, 3], 3, 1)).toEqual([]);
  });

  it("should handle fractional indexes", () => {
    expect(slice([1, 2, 3, 4], 1.9, 3.1)).toEqual([2, 3]);
  });

  it("should handle empty array", () => {
    expect(slice([])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(slice(null)).toEqual([]);
    expect(slice(undefined)).toEqual([]);
    expect(slice({ a: 1 })).toEqual([]);
  });
});
