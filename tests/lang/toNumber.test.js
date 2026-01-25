import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toNumber,
} from "../../dist/index.js";

describe("toNumber function", () => {
  it("should handle booleans and nil values", () => {
    expect(toNumber(false)).toBe(0);
    expect(toNumber(true)).toBe(1);
    expect(toNumber(null)).toBe(0);
    expect(toNumber(undefined)).toBe(0);
  });

  it("should handle numbers", () => {
    expect(toNumber(0)).toBe(0);
    expect(toNumber(-0)).toBe(-0);
    expect(toNumber(3.14)).toBe(3.14);
    expect(Number.isNaN(toNumber(NaN))).toBe(true);
  });

  it("should handle strings", () => {
    expect(toNumber("123")).toBe(123);
    expect(toNumber("  123  ")).toBe(123);
    expect(Number.isNaN(toNumber("abc"))).toBe(true);
  });

  it("should handle arrays", () => {
    expect(toNumber([])).toBe(0);
    expect(toNumber([123])).toBe(123);
    expect(Number.isNaN(toNumber(["123", "342"]))).toBe(true);
  });

  it("should handle objects and symbols", () => {
    expect(Number.isNaN(toNumber({ aloha: "hola" }))).toBe(true);
    expect(Number.isNaN(toNumber(Symbol("x")))).toBe(true);
  });
});
