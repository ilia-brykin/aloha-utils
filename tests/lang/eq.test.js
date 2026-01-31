import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  eq,
} from "../../dist/index.js";

describe("eq function", () => {
  it("should compare object references", () => {
    const obj = { a: 1 };
    const other = { a: 1 };

    expect(eq(obj, obj)).toBe(true);
    expect(eq(obj, other)).toBe(false);
  });

  it("should compare primitives by value", () => {
    expect(eq("a", "a")).toBe(true);
    expect(eq(1, 1)).toBe(true);
    expect(eq(true, true)).toBe(true);
    expect(eq(0, 0)).toBe(true);
    expect(eq("", "")).toBe(true);
  });

  it("should treat NaN as equal to NaN", () => {
    expect(eq(NaN, NaN)).toBe(true);
  });

  it("should treat -0 and 0 as equal", () => {
    expect(eq(-0, 0)).toBe(true);
    expect(eq(0, -0)).toBe(true);
  });

  it("should not coerce types", () => {
    expect(eq("1", 1)).toBe(false);
    expect(eq("true", true)).toBe(false);
    expect(eq("a", Object("a"))).toBe(false);
    expect(eq(false, 0)).toBe(false);
  });

  it("should compare symbols by reference", () => {
    const sym = Symbol("x");
    const other = Symbol("x");

    expect(eq(sym, sym)).toBe(true);
    expect(eq(sym, other)).toBe(false);
  });

  it("should compare boxed primitives by reference", () => {
    const a = Object("a");
    const b = Object("a");
    const n1 = Object(1);
    const n2 = Object(1);

    expect(eq(a, a)).toBe(true);
    expect(eq(a, b)).toBe(false);
    expect(eq(n1, n2)).toBe(false);
  });

  it("should treat null and undefined as different", () => {
    expect(eq(null, undefined)).toBe(false);
    expect(eq(null, null)).toBe(true);
    expect(eq(undefined, undefined)).toBe(true);
  });

  it("should compare functions by reference", () => {
    const fn = () => {};
    const fn2 = () => {};

    expect(eq(fn, fn)).toBe(true);
    expect(eq(fn, fn2)).toBe(false);
  });

  it("should compare arrays and objects by reference", () => {
    const arr = [1, 2];
    const arr2 = [1, 2];
    const obj = { a: 1 };
    const obj2 = { a: 1 };

    expect(eq(arr, arr)).toBe(true);
    expect(eq(arr, arr2)).toBe(false);
    expect(eq(obj, obj)).toBe(true);
    expect(eq(obj, obj2)).toBe(false);
  });

  it("should handle infinities", () => {
    expect(eq(Infinity, Infinity)).toBe(true);
    expect(eq(-Infinity, -Infinity)).toBe(true);
    expect(eq(Infinity, -Infinity)).toBe(false);
  });
});
