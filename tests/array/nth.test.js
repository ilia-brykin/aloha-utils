import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  nth,
} from "../../dist/index.js";

describe("nth function", () => {
  const array = ["a", "b", "c", "d"];

  it("should get element at index", () => {
    expect(nth(array, 1)).toBe("b");
  });

  it("should support negative index", () => {
    expect(nth(array, -2)).toBe("c");
  });

  it("should handle fractional index", () => {
    expect(nth(array, 1.9)).toBe("b");
  });

  it("should return undefined for out of range", () => {
    expect(nth(array, 10)).toBeUndefined();
    expect(nth(array, -10)).toBeUndefined();
  });

  it("should handle empty array", () => {
    expect(nth([], 0)).toBeUndefined();
  });

  it("should handle non-array input", () => {
    expect(nth(null, 0)).toBeUndefined();
    expect(nth(undefined, 0)).toBeUndefined();
    expect(nth({ a: 1 }, 0)).toBeUndefined();
  });
});
