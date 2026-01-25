import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isFloat,
} from "../../dist/index.js";

describe("isFloat function", () => {
  it("should return true for finite non-integers", () => {
    expect(isFloat(1.5)).toBe(true);
    expect(isFloat(-1.5)).toBe(true);
    expect(isFloat(0.1)).toBe(true);
  });

  it("should return false for integers and non-numbers", () => {
    expect(isFloat(0)).toBe(false);
    expect(isFloat(-0)).toBe(false);
    expect(isFloat(2)).toBe(false);
    expect(isFloat(NaN)).toBe(false);
    expect(isFloat(Infinity)).toBe(false);
    expect(isFloat("1.5")).toBe(false);
    expect(isFloat(null)).toBe(false);
    expect(isFloat(undefined)).toBe(false);
  });
});
