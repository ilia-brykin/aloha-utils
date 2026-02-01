import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  unzip,
} from "../../dist/index.js";

describe("unzip function", () => {
  it("should regroup zipped arrays", () => {
    const zipped = [["a", 1, true], ["b", 2, false]];
    const result = unzip(zipped);
    expect(result).toEqual([["a", "b"], [1, 2], [true, false]]);
  });

  it("should handle groups of different lengths", () => {
    const zipped = [["a"], ["b", 2]];
    const result = unzip(zipped);
    expect(result).toEqual([["a", "b"], [undefined, 2]]);
  });

  it("should handle empty array", () => {
    expect(unzip([])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(unzip(null)).toEqual([]);
    expect(unzip(undefined)).toEqual([]);
    expect(unzip({ a: 1 })).toEqual([]);
  });
});
