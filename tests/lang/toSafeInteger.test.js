import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toSafeInteger,
} from "../../dist/index.js";

describe("toSafeInteger function", () => {
  it("should convert values to safe integers", () => {
    expect(toSafeInteger(3.2)).toBe(3);
    expect(toSafeInteger(Number.MIN_VALUE)).toBe(0);
    expect(toSafeInteger(Infinity)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toSafeInteger(-Infinity)).toBe(-Number.MAX_SAFE_INTEGER);
    expect(toSafeInteger("3.2")).toBe(3);
  });

  it("should handle invalid or non-numeric inputs", () => {
    expect(toSafeInteger(false)).toBe(0);
    expect(toSafeInteger(true)).toBe(1);
    expect(toSafeInteger(null)).toBe(0);
    expect(toSafeInteger(undefined)).toBe(0);
    expect(toSafeInteger({ aloha: "hola" })).toBe(0);
    expect(toSafeInteger([])).toBe(0);
    expect(toSafeInteger(["123", "342"])).toBe(0);
    expect(toSafeInteger("abc")).toBe(0);
    expect(toSafeInteger(Symbol("x"))).toBe(0);
  });

  it("should preserve negative zero", () => {
    expect(Object.is(toSafeInteger(-0), 0)).toBe(true);
  });

  it("should clamp beyond the safe integer range", () => {
    expect(toSafeInteger(Number.MAX_SAFE_INTEGER + 10)).toBe(Number.MAX_SAFE_INTEGER);
    expect(toSafeInteger(-(Number.MAX_SAFE_INTEGER + 10))).toBe(-Number.MAX_SAFE_INTEGER);
  });
});
