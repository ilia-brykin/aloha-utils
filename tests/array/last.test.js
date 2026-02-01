import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  last,
} from "../../dist/index.js";

describe("last function", () => {
  it("should return the last element", () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it("should return undefined for empty array", () => {
    expect(last([])).toBeUndefined();
  });

  it("should not mutate the array", () => {
    const array = [1, 2, 3];
    last(array);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle non-array input", () => {
    expect(last(null)).toBeUndefined();
    expect(last(undefined)).toBeUndefined();
    expect(last({ a: 1 })).toBeUndefined();
  });
});
