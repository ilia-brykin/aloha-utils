import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toFinite,
} from "../../dist/index.js";

describe("toFinite function", () => {
  it("should convert values to finite numbers", () => {
    expect(toFinite(3.2)).toBe(3.2);
    expect(toFinite(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    expect(toFinite(Infinity)).toBe(Number.MAX_VALUE);
    expect(toFinite(-Infinity)).toBe(-Number.MAX_VALUE);
    expect(toFinite("3.2")).toBe(3.2);
  });

  it("should handle invalid or non-numeric inputs", () => {
    expect(toFinite(false)).toBe(0);
    expect(toFinite(true)).toBe(1);
    expect(toFinite(null)).toBe(0);
    expect(toFinite(undefined)).toBe(0);
    expect(toFinite({ aloha: "hola" })).toBe(0);
    expect(toFinite([])).toBe(0);
    expect(toFinite([123])).toBe(123);
    expect(toFinite(["123", "342"])).toBe(0);
    expect(toFinite("abc")).toBe(0);
    expect(toFinite(Symbol("x"))).toBe(0);
  });

  it("should preserve negative zero", () => {
    expect(Object.is(toFinite(-0), 0)).toBe(true);
  });
});
