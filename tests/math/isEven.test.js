import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isEven,
} from "../../dist/index.js";

describe("isEven function", () => {
  it("should return true for even integers", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
    expect(isEven(-2)).toBe(true);
    expect(isEven(4)).toBe(true);
    expect(isEven(Number.MAX_SAFE_INTEGER - 1)).toBe(true);
  });

  it("should return false for odd or non-integers", () => {
    expect(isEven(1)).toBe(false);
    expect(isEven(-1)).toBe(false);
    expect(isEven(1.5)).toBe(false);
    expect(isEven(NaN)).toBe(false);
    expect(isEven(Infinity)).toBe(false);
    expect(isEven(-Infinity)).toBe(false);
    expect(isEven("2")).toBe(false);
    expect(isEven(true)).toBe(false);
    expect(isEven(false)).toBe(false);
    expect(isEven({})).toBe(false);
    expect(isEven([])).toBe(false);
    expect(isEven(null)).toBe(false);
    expect(isEven(undefined)).toBe(false);
  });
});
