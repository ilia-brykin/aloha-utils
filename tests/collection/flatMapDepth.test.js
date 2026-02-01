import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  flatMapDepth,
} from "../../dist/index.js";

describe("flatMapDepth function", () => {
  it("should map and flatten to depth", () => {
    const result = flatMapDepth([1, 2], value => [[[value, value]]], 2);
    expect(result).toEqual([[1, 1], [2, 2]]);
  });

  it("should support object collections", () => {
    const result = flatMapDepth({ a: 1, b: 2 }, value => [[value]], 1);
    expect(result).toEqual([[1], [2]]);
  });

  it("should use identity when iteratee omitted", () => {
    expect(flatMapDepth([1, [2]], undefined, 1)).toEqual([1, 2]);
  });

  it("should handle depth 0", () => {
    const result = flatMapDepth([1, 2], value => [[value]], 0);
    expect(result).toEqual([[[1]], [[2]]]);
  });

  it("should handle empty collection", () => {
    expect(flatMapDepth([])).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(flatMapDepth(null)).toEqual([]);
    expect(flatMapDepth(undefined)).toEqual([]);
  });
});
