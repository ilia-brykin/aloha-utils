import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isFloatNonNegative,
} from "../../dist/index.js";

describe("isFloatNonNegative function", () => {
  it("should return true for non-negative finite non-integers", () => {
    expect(isFloatNonNegative(0.1)).toBe(true);
    expect(isFloatNonNegative(1.5)).toBe(true);
  });

  it("should return false for negatives or non-floats", () => {
    expect(isFloatNonNegative(0)).toBe(false);
    expect(isFloatNonNegative(-0)).toBe(false);
    expect(isFloatNonNegative(-1.5)).toBe(false);
    expect(isFloatNonNegative(1)).toBe(false);
    expect(isFloatNonNegative(NaN)).toBe(false);
    expect(isFloatNonNegative(Infinity)).toBe(false);
    expect(isFloatNonNegative("1.5")).toBe(false);
    expect(isFloatNonNegative(null)).toBe(false);
    expect(isFloatNonNegative(undefined)).toBe(false);
  });
});
