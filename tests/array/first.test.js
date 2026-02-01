import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  first,
} from "../../dist/index.js";

describe("first function", () => {
  it("should return the first element", () => {
    expect(first([1, 2, 3])).toBe(1);
  });

  it("should return undefined for empty array", () => {
    expect(first([])).toBeUndefined();
  });

  it("should not mutate the array", () => {
    const array = [1, 2, 3];
    first(array);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle non-array input", () => {
    expect(first(null)).toBeUndefined();
    expect(first(undefined)).toBeUndefined();
    expect(first({ a: 1 })).toBeUndefined();
  });
});
