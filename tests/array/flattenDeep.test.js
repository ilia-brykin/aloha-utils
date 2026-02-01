import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  flattenDeep,
} from "../../dist/index.js";

describe("flattenDeep function", () => {
  it("should flatten deeply nested arrays", () => {
    const array = [1, [2, [3, [4]], 5]];
    expect(flattenDeep(array)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle arrays with empty nested arrays", () => {
    const array = [1, [], [2, [], [3]]];
    expect(flattenDeep(array)).toEqual([1, 2, 3]);
  });

  it("should handle empty array", () => {
    expect(flattenDeep([])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(flattenDeep(null)).toEqual([]);
    expect(flattenDeep(undefined)).toEqual([]);
    expect(flattenDeep({ a: 1 })).toEqual([]);
  });
});
