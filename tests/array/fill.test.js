import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  fill,
} from "../../dist/index.js";

describe("fill function", () => {
  it("should fill entire array when start and end omitted", () => {
    const array = [1, 2, 3];
    const result = fill(array, "a");
    expect(result).toBe(array);
    expect(array).toEqual(["a", "a", "a"]);
  });

  it("should fill array-like length with value", () => {
    expect(fill(Array(3), 2)).toEqual([2, 2, 2]);
  });

  it("should fill from start to end", () => {
    const array = [4, 6, 8, 10];
    fill(array, "*", 1, 3);
    expect(array).toEqual([4, "*", "*", 10]);
  });

  it("should handle negative start and end", () => {
    const array = [1, 2, 3, 4];
    fill(array, 9, -3, -1);
    expect(array).toEqual([1, 9, 9, 4]);
  });

  it("should clamp negative start beyond length", () => {
    const array = [1, 2, 3];
    fill(array, 5, -10, 2);
    expect(array).toEqual([5, 5, 3]);
  });

  it("should clamp negative end beyond length", () => {
    const array = [1, 2, 3, 4];
    fill(array, 8, 1, -10);
    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should handle end before start", () => {
    const array = [1, 2, 3];
    fill(array, 9, 2, 1);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle fractional start and end", () => {
    const array = [1, 2, 3, 4];
    fill(array, 7, 1.9, 3.1);
    expect(array).toEqual([1, 7, 7, 4]);
  });

  it("should handle string start and end values", () => {
    const array = [1, 2, 3, 4];
    fill(array, 6, "1", "3");
    expect(array).toEqual([1, 6, 6, 4]);
  });

  it("should handle end of 0", () => {
    const array = [1, 2, 3];
    fill(array, 4, 0, 0);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle start beyond length", () => {
    const array = [1, 2, 3];
    fill(array, 9, 10);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle non-array input", () => {
    expect(fill(null, 1)).toBeNull();
    expect(fill(undefined, 1)).toBeUndefined();
    expect(fill({ a: 1 }, 1)).toEqual({ a: 1 });
  });
});
