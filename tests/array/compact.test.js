import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  compact,
} from "../../dist/index.js";

describe("compact function", () => {
  it("should remove falsy values", () => {
    expect(compact([0, 1, false, 2, "", 3])).toEqual([1, 2, 3]);
    expect(compact([null, undefined, NaN, 0, -0, 0n])).toEqual([]);
  });

  it("should keep truthy values", () => {
    expect(compact([true, "a", 1, {}, [], -1, 1n])).toEqual([true, "a", 1, {}, [], -1, 1n]);
  });

  it("should handle empty array", () => {
    expect(compact([])).toEqual([]);
  });

  it("should not mutate the original array", () => {
    const input = [0, 1, false, 2];
    const result = compact(input);
    expect(input).toEqual([0, 1, false, 2]);
    expect(result).toEqual([1, 2]);
  });

  it("should handle non-array inputs", () => {
    expect(compact(null)).toEqual([]);
    expect(compact(undefined)).toEqual([]);
    expect(compact({ a: 1 })).toEqual([]);
  });
});
