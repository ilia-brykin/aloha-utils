import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sampleSize,
} from "../../dist/index.js";

describe("sampleSize function", () => {
  it("should return n random elements", () => {
    const array = [1, 2, 3];
    const result = sampleSize(array, 2);
    expect(result.length).toBe(2);
    result.forEach(value => expect(array).toContain(value));
  });

  it("should not return more than collection size", () => {
    const result = sampleSize([1, 2, 3], 5);
    expect(result.length).toBe(3);
  });

  it("should handle n <= 0", () => {
    expect(sampleSize([1, 2], 0)).toEqual([]);
    expect(sampleSize([1, 2], -1)).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(sampleSize(null, 2)).toEqual([]);
    expect(sampleSize(undefined, 2)).toEqual([]);
  });
});
