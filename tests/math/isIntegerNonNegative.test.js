import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isIntegerNonNegative,
} from "../../dist/index.js";

describe("isIntegerNonNegative function", () => {
  it("should return true for non-negative integers", () => {
    expect(isIntegerNonNegative(0)).toBe(true);
    expect(isIntegerNonNegative(-0)).toBe(true);
    expect(isIntegerNonNegative(5)).toBe(true);
    expect(isIntegerNonNegative(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it("should return false for negative or non-integers", () => {
    expect(isIntegerNonNegative(-1)).toBe(false);
    expect(isIntegerNonNegative(-2)).toBe(false);
    expect(isIntegerNonNegative(1.5)).toBe(false);
    expect(isIntegerNonNegative(NaN)).toBe(false);
    expect(isIntegerNonNegative(Infinity)).toBe(false);
    expect(isIntegerNonNegative(-Infinity)).toBe(false);
    expect(isIntegerNonNegative("0")).toBe(false);
    expect(isIntegerNonNegative(true)).toBe(false);
    expect(isIntegerNonNegative(false)).toBe(false);
    expect(isIntegerNonNegative({})).toBe(false);
    expect(isIntegerNonNegative([])).toBe(false);
    expect(isIntegerNonNegative(null)).toBe(false);
    expect(isIntegerNonNegative(undefined)).toBe(false);
  });
});
