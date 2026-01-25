import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isSafeInteger,
} from "../../dist/index.js";

describe("isSafeInteger function", () => {
  it("should return true for safe integers", () => {
    expect(isSafeInteger(0)).toBe(true);
    expect(isSafeInteger(3)).toBe(true);
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(isSafeInteger(-Number.MAX_SAFE_INTEGER)).toBe(true);
  });

  it("should return false for unsafe or non-integer values", () => {
    expect(isSafeInteger(Number.MIN_VALUE)).toBe(false);
    expect(isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
    expect(isSafeInteger(3.1)).toBe(false);
    expect(isSafeInteger(Infinity)).toBe(false);
    expect(isSafeInteger("3")).toBe(false);
    expect(isSafeInteger(null)).toBe(false);
    expect(isSafeInteger(undefined)).toBe(false);
  });
});
