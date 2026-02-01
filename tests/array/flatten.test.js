import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  flatten,
} from "../../dist/index.js";

describe("flatten function", () => {
  it("should flatten one level deep", () => {
    const array = [1, [2, [3, [4]], 5]];
    expect(flatten(array)).toEqual([1, 2, [3, [4]], 5]);
  });

  it("should keep non-array values as is", () => {
    const array = [1, "a", [2, "b"]];
    expect(flatten(array)).toEqual([1, "a", 2, "b"]);
  });

  it("should handle empty array", () => {
    expect(flatten([])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(flatten(null)).toEqual([]);
    expect(flatten(undefined)).toEqual([]);
    expect(flatten({ a: 1 })).toEqual([]);
  });
});
