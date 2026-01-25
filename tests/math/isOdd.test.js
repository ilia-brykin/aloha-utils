import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isOdd,
} from "../../dist/index.js";

describe("isOdd function", () => {
  it("should return true for odd integers", () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(3)).toBe(true);
    expect(isOdd(-1)).toBe(true);
    expect(isOdd(-3)).toBe(true);
    expect(isOdd(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it("should return false for even or non-integers", () => {
    expect(isOdd(0)).toBe(false);
    expect(isOdd(2)).toBe(false);
    expect(isOdd(-2)).toBe(false);
    expect(isOdd(1.5)).toBe(false);
    expect(isOdd(NaN)).toBe(false);
    expect(isOdd(Infinity)).toBe(false);
    expect(isOdd(-Infinity)).toBe(false);
    expect(isOdd("1")).toBe(false);
    expect(isOdd(true)).toBe(false);
    expect(isOdd(false)).toBe(false);
    expect(isOdd({})).toBe(false);
    expect(isOdd([])).toBe(false);
    expect(isOdd(null)).toBe(false);
    expect(isOdd(undefined)).toBe(false);
  });
});
