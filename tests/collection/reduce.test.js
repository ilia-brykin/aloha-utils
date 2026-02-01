import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  reduce,
} from "../../dist/index.js";

describe("reduce function", () => {
  it("should reduce array with accumulator", () => {
    const result = reduce([1, 2], (sum, n) => sum + n, 0);
    expect(result).toBe(3);
  });

  it("should use first element as accumulator when not provided", () => {
    const result = reduce([1, 2, 3], (sum, n) => sum + n);
    expect(result).toBe(6);
  });

  it("should reduce object collections", () => {
    const result = reduce({ a: 1, b: 2, c: 1 }, (acc, value, key) => {
      if (!acc[value]) {
        acc[value] = [];
      }
      acc[value].push(key);
      return acc;
    }, {});
    expect(result).toEqual({ 1: ["a", "c"], 2: ["b"] });
  });

  it("should return undefined for empty collection without accumulator", () => {
    expect(reduce([], (acc, value) => acc)).toBeUndefined();
  });

  it("should handle nullish collection", () => {
    expect(reduce(null, (acc, value) => acc, 1)).toBe(1);
    expect(reduce(undefined, (acc, value) => acc)).toBeUndefined();
  });
});
