import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pull,
} from "../../dist/index.js";

describe("pull function", () => {
  it("should remove values from array", () => {
    const array = ["a", "b", "c", "a", "b", "c"];
    const result = pull(array, "a", "c");
    expect(array).toEqual(["b", "b"]);
    expect(result).toBe(array);
  });

  it("should use SameValueZero comparisons", () => {
    const array = [NaN, 0, -0, 1];
    pull(array, NaN, -0);
    expect(array).toEqual([1]);
  });

  it("should handle empty values list", () => {
    const array = [1, 2, 3];
    pull(array);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle non-array input", () => {
    expect(pull(null, 1)).toEqual(null);
    expect(pull(undefined, 1)).toEqual(undefined);
  });
});
