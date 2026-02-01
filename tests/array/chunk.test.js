import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  chunk,
} from "../../dist/index.js";

describe("chunk function", () => {
  it("should chunk arrays", () => {
    expect(chunk(["a", "b", "c", "d"], 2)).toEqual([["a", "b"], ["c", "d"]]);
    expect(chunk(["a", "b", "c", "d"], 3)).toEqual([["a", "b", "c"], ["d"]]);
  });

  it("should handle default size", () => {
    expect(chunk(["a", "b"])).toEqual([["a"], ["b"]]);
  });

  it("should return empty array for empty input", () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it("should handle size larger than array length", () => {
    expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
  });

  it("should handle non-integer size", () => {
    expect(chunk([1, 2, 3, 4], 2.9)).toEqual([[1, 2], [3, 4]]);
    expect(chunk([1, 2, 3], "2")).toEqual([[1, 2], [3]]);
  });

  it("should return empty array for invalid size", () => {
    expect(chunk([1, 2, 3], 0)).toEqual([]);
    expect(chunk([1, 2, 3], -1)).toEqual([]);
    expect(chunk([1, 2, 3], NaN)).toEqual([]);
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4];
    const result = chunk(array, 2);
    expect(array).toEqual([1, 2, 3, 4]);
    expect(result).toEqual([[1, 2], [3, 4]]);
  });

  it("should handle non-array inputs", () => {
    expect(chunk(null, 2)).toEqual([]);
    expect(chunk(undefined, 2)).toEqual([]);
    expect(chunk({ a: 1 }, 2)).toEqual([]);
  });
});
