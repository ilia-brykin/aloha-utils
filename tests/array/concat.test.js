import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  concat,
} from "../../dist/index.js";

describe("concat function", () => {
  it("should concatenate arrays and values", () => {
    const array = [1];
    const other = concat(array, 2, [3], [[4]]);
    expect(other).toEqual([1, 2, 3, [4]]);
  });

  it("should not mutate the original array", () => {
    const array = [1];
    const other = concat(array, 2, [3], [[4]]);
    expect(array).toEqual([1]);
    expect(other).toEqual([1, 2, 3, [4]]);
  });

  it("should handle empty values", () => {
    expect(concat([1])).toEqual([1]);
    expect(concat([], 1)).toEqual([1]);
    expect(concat([], [])).toEqual([]);
  });

  it("should handle multiple arrays", () => {
    expect(concat([1], [2, 3], [4], 5)).toEqual([1, 2, 3, 4, 5]);
    expect(concat([1, 2], [], [3])).toEqual([1, 2, 3]);
  });

  it("should only flatten one level of arrays", () => {
    expect(concat([1], [[2]], [[[3]]])).toEqual([1, [2], [[3]]]);
    expect(concat([[1]], [2], [[3, 4]])).toEqual([[1], 2, [3, 4]]);
  });

  it("should handle non-array base input", () => {
    expect(concat(null, 1, 2)).toEqual([1, 2]);
    expect(concat(undefined, [1], 2)).toEqual([1, 2]);
    expect(concat({ a: 1 }, 2)).toEqual([2]);
  });

  it("should handle mixed types", () => {
    const obj = { a: 1 };
    const fn = () => {};
    expect(concat([obj], fn, "x", true, 0)).toEqual([obj, fn, "x", true, 0]);
  });

  it("should keep references for objects and arrays", () => {
    const obj = { a: 1 };
    const arr = [2];
    const result = concat([obj], arr);
    expect(result[0]).toBe(obj);
    expect(result[1]).toBe(2);
  });
});
