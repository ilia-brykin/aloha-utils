import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  initial,
} from "../../dist/index.js";

describe("initial function", () => {
  it("should return all but the last element", () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
  });

  it("should handle single element array", () => {
    expect(initial([1])).toEqual([]);
  });

  it("should return empty array for empty input", () => {
    expect(initial([])).toEqual([]);
  });

  it("should return a new array", () => {
    const array = [1, 2, 3];
    const result = initial(array);
    expect(result).toEqual([1, 2]);
    expect(result).not.toBe(array);
  });

  it("should handle non-array input", () => {
    expect(initial(null)).toEqual([]);
    expect(initial(undefined)).toEqual([]);
    expect(initial({ a: 1 })).toEqual([]);
  });
});
