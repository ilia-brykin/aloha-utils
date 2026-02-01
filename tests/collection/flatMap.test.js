import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  flatMap,
} from "../../dist/index.js";

describe("flatMap function", () => {
  it("should map and flatten one level", () => {
    const result = flatMap([1, 2], value => [value, value]);
    expect(result).toEqual([1, 1, 2, 2]);
  });

  it("should support object collections", () => {
    const result = flatMap({ a: 1, b: 2 }, value => [value]);
    expect(result).toEqual([1, 2]);
  });

  it("should use identity when iteratee omitted", () => {
    expect(flatMap([1, [2]], undefined)).toEqual([1, 2]);
  });

  it("should handle empty collection", () => {
    expect(flatMap([])).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(flatMap(null)).toEqual([]);
    expect(flatMap(undefined)).toEqual([]);
  });
});
