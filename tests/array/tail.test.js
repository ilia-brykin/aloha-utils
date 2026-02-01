import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  tail,
} from "../../dist/index.js";

describe("tail function", () => {
  it("should return all but the first element", () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
  });

  it("should handle single element array", () => {
    expect(tail([1])).toEqual([]);
  });

  it("should handle empty array", () => {
    expect(tail([])).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(tail(null)).toEqual([]);
    expect(tail(undefined)).toEqual([]);
    expect(tail({ a: 1 })).toEqual([]);
  });
});
