import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  xor,
} from "../../dist/index.js";

describe("xor function", () => {
  it("should return symmetric difference", () => {
    expect(xor([2, 1], [2, 3])).toEqual([1, 3]);
  });

  it("should handle multiple arrays", () => {
    expect(xor([1, 2], [2, 3], [3, 4])).toEqual([1, 4]);
  });

  it("should use SameValueZero comparisons", () => {
    expect(xor([NaN, 1], [NaN, 2])).toEqual([1, 2]);
  });

  it("should handle empty arrays", () => {
    expect(xor([], [1, 2])).toEqual([1, 2]);
    expect(xor([1, 2], [])).toEqual([1, 2]);
  });

  it("should handle no arrays", () => {
    expect(xor()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(xor([1, 2], null)).toEqual([]);
    expect(xor(null, [1, 2])).toEqual([]);
  });
});
