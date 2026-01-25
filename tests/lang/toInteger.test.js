import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toInteger,
} from "../../dist/index.js";

describe("toInteger function", () => {
  it("should handle booleans and nil values", () => {
    expect(toInteger(false)).toBe(0);
    expect(toInteger(true)).toBe(1);
    expect(toInteger(null)).toBe(0);
    expect(toInteger(undefined)).toBe(0);
  });

  it("should handle objects and arrays", () => {
    expect(toInteger({ aloha: "hola" })).toBe(0);
    expect(toInteger([])).toBe(0);
    expect(toInteger([123])).toBe(123);
    expect(toInteger(["123", "342"])).toBe(0);
    expect(toInteger(["  123  "])).toBe(123);
  });

  it("should truncate numbers toward zero", () => {
    expect(toInteger(3.9)).toBe(3);
    expect(toInteger(-3.9)).toBe(-3);
    expect(toInteger(-0)).toBe(-0);
    expect(toInteger(0.0001)).toBe(0);
    expect(toInteger(-0.0001)).toBe(-0);
  });

  it("should handle infinities", () => {
    expect(toInteger(Infinity)).toBe(Number.MAX_VALUE);
    expect(toInteger(-Infinity)).toBe(-Number.MAX_VALUE);
  });

  it("should handle numeric strings", () => {
    expect(toInteger("42")).toBe(42);
    expect(toInteger("  42  ")).toBe(42);
    expect(toInteger("3.14")).toBe(3);
    expect(toInteger("-3.14")).toBe(-3);
  });
});
