import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isArrayLike,
} from "../../dist/index.js";

describe("isArrayLike function", () => {
  it("should return true for array-like values", () => {
    const args = (function example() {
      return arguments;
    }("a", "b"));
    const nodeList = document.querySelectorAll("div");

    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike([1, 2])).toBe(true);
    expect(isArrayLike("test")).toBe(true);
    expect(isArrayLike(args)).toBe(true);
    expect(isArrayLike(new Uint8Array(2))).toBe(true);
    expect(isArrayLike(nodeList)).toBe(true);
    expect(isArrayLike({ length: 0 })).toBe(true);
    expect(isArrayLike({ length: 0, 0: "a" })).toBe(true);
    expect(isArrayLike({ length: 2 })).toBe(true);
  });

  it("should return false for non-array-like values", () => {
    expect(isArrayLike({})).toBe(false);
    expect(isArrayLike({ length: -1 })).toBe(false);
    expect(isArrayLike({ length: 1.5 })).toBe(false);
    expect(isArrayLike({ length: NaN })).toBe(false);
    expect(isArrayLike({ length: Infinity })).toBe(false);
    expect(isArrayLike({ length: "2" })).toBe(false);
    expect(isArrayLike(null)).toBe(false);
    expect(isArrayLike(undefined)).toBe(false);
    expect(isArrayLike(() => {})).toBe(false);
  });
});
