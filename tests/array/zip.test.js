import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  zip,
} from "../../dist/index.js";

describe("zip function", () => {
  it("should group elements by index", () => {
    const result = zip(["a", "b"], [1, 2], [true, false]);
    expect(result).toEqual([["a", 1, true], ["b", 2, false]]);
  });

  it("should handle arrays of different lengths", () => {
    const result = zip(["a"], [1, 2]);
    expect(result).toEqual([["a", 1], [undefined, 2]]);
  });

  it("should handle empty arrays", () => {
    expect(zip([], [])).toEqual([]);
  });

  it("should handle no arrays", () => {
    expect(zip()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(zip(["a"], null)).toEqual([]);
    expect(zip(null, ["a"])).toEqual([]);
  });
});
