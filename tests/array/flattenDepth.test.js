import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  flattenDepth,
} from "../../dist/index.js";

describe("flattenDepth function", () => {
  it("should flatten one level by default", () => {
    const array = [1, [2, [3, [4]], 5]];
    expect(flattenDepth(array)).toEqual([1, 2, [3, [4]], 5]);
  });

  it("should flatten up to specified depth", () => {
    const array = [1, [2, [3, [4]], 5]];
    expect(flattenDepth(array, 2)).toEqual([1, 2, 3, [4], 5]);
  });

  it("should return shallow copy for depth 0", () => {
    const array = [1, [2]];
    const result = flattenDepth(array, 0);
    expect(result).toEqual([1, [2]]);
    expect(result).not.toBe(array);
  });

  it("should handle negative depth", () => {
    const array = [1, [2]];
    expect(flattenDepth(array, -1)).toEqual([1, [2]]);
  });

  it("should handle fractional depth", () => {
    const array = [1, [2, [3]]];
    expect(flattenDepth(array, 1.9)).toEqual([1, 2, [3]]);
  });

  it("should handle empty array", () => {
    expect(flattenDepth([], 2)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(flattenDepth(null, 2)).toEqual([]);
    expect(flattenDepth(undefined, 2)).toEqual([]);
    expect(flattenDepth({ a: 1 }, 2)).toEqual([]);
  });
});
