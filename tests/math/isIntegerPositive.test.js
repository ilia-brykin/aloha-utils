import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isIntegerPositive,
} from "../../dist/index.js";

describe("isIntegerPositive function", () => {
  it("should return true for positive integers", () => {
    expect(isIntegerPositive(1)).toBe(true);
    expect(isIntegerPositive(42)).toBe(true);
    expect(isIntegerPositive(Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it("should return false for non-positive or non-integers", () => {
    expect(isIntegerPositive(0)).toBe(false);
    expect(isIntegerPositive(-0)).toBe(false);
    expect(isIntegerPositive(-1)).toBe(false);
    expect(isIntegerPositive(1.5)).toBe(false);
    expect(isIntegerPositive(NaN)).toBe(false);
    expect(isIntegerPositive(Infinity)).toBe(false);
    expect(isIntegerPositive(-Infinity)).toBe(false);
    expect(isIntegerPositive("1")).toBe(false);
    expect(isIntegerPositive(true)).toBe(false);
    expect(isIntegerPositive(false)).toBe(false);
    expect(isIntegerPositive({})).toBe(false);
    expect(isIntegerPositive([])).toBe(false);
    expect(isIntegerPositive(null)).toBe(false);
    expect(isIntegerPositive(undefined)).toBe(false);
  });
});
