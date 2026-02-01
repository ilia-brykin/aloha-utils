import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  unzipWith,
} from "../../dist/index.js";

describe("unzipWith function", () => {
  it("should regroup and combine using iteratee", () => {
    const zipped = [[1, 10, 100], [2, 20, 200]];
    const result = unzipWith(zipped, (a, b) => a + b);
    expect(result).toEqual([3, 30, 300]);
  });

  it("should fall back to unzip when iteratee omitted", () => {
    const zipped = [["a", 1], ["b", 2]];
    const result = unzipWith(zipped);
    expect(result).toEqual([["a", "b"], [1, 2]]);
  });

  it("should handle empty array", () => {
    expect(unzipWith([], (a, b) => a ?? b)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(unzipWith(null, (a, b) => a ?? b)).toEqual([]);
    expect(unzipWith(undefined, (a, b) => a ?? b)).toEqual([]);
    expect(unzipWith({ a: 1 }, (a, b) => a ?? b)).toEqual([]);
  });
});
