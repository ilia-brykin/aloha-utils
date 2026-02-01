import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  reduceRight,
} from "../../dist/index.js";

describe("reduceRight function", () => {
  it("should reduce array from right to left", () => {
    const array = [[0, 1], [2, 3], [4, 5]];
    const result = reduceRight(array, (acc, value) => acc.concat(value), []);
    expect(result).toEqual([4, 5, 2, 3, 0, 1]);
  });

  it("should use last element as accumulator when not provided", () => {
    const result = reduceRight([1, 2, 3], (sum, n) => sum + n);
    expect(result).toBe(6);
  });

  it("should reduce object collections in reverse key order", () => {
    const result = reduceRight({ a: 1, b: 2, c: 3 }, (acc, value) => acc.concat(value), []);
    expect(result).toEqual([3, 2, 1]);
  });

  it("should return undefined for empty collection without accumulator", () => {
    expect(reduceRight([], (acc, value) => acc)).toBeUndefined();
  });

  it("should handle nullish collection", () => {
    expect(reduceRight(null, (acc, value) => acc, 1)).toBe(1);
    expect(reduceRight(undefined, (acc, value) => acc)).toBeUndefined();
  });
});
