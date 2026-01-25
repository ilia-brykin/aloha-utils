import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isFloatPositive,
} from "../../dist/index.js";

describe("isFloatPositive function", () => {
  it("should return true for positive finite non-integers", () => {
    expect(isFloatPositive(0.1)).toBe(true);
    expect(isFloatPositive(1.5)).toBe(true);
  });

  it("should return false for non-positive or non-floats", () => {
    expect(isFloatPositive(0)).toBe(false);
    expect(isFloatPositive(-0)).toBe(false);
    expect(isFloatPositive(-1.5)).toBe(false);
    expect(isFloatPositive(1)).toBe(false);
    expect(isFloatPositive(NaN)).toBe(false);
    expect(isFloatPositive(Infinity)).toBe(false);
    expect(isFloatPositive("1.5")).toBe(false);
    expect(isFloatPositive(null)).toBe(false);
    expect(isFloatPositive(undefined)).toBe(false);
  });
});
