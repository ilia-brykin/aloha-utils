import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  endsWith,
} from "../../dist/index.js";

describe("endsWith function", () => {
  it("should check basic endings", () => {
    expect(endsWith("abc", "c")).toBe(true);
    expect(endsWith("abc", "b")).toBe(false);
    expect(endsWith("abc", "bc")).toBe(true);
    expect(endsWith("abc", "abc")).toBe(true);
  });

  it("should respect position argument", () => {
    expect(endsWith("abc", "b", 2)).toBe(true);
    expect(endsWith("abc", "c", 2)).toBe(false);
    expect(endsWith("abc", "a", 1)).toBe(true);
  });

  it("should handle position beyond length", () => {
    expect(endsWith("abc", "c", 10)).toBe(true);
    expect(endsWith("abc", "bc", 10)).toBe(true);
  });

  it("should handle negative or zero position", () => {
    expect(endsWith("abc", "a", -1)).toBe(false);
    expect(endsWith("abc", "", -1)).toBe(true);
    expect(endsWith("abc", "a", 0)).toBe(false);
    expect(endsWith("abc", "", 0)).toBe(true);
  });

  it("should handle empty target", () => {
    expect(endsWith("abc", "")).toBe(true);
    expect(endsWith("", "")).toBe(true);
  });

  it("should return false when target is longer than string", () => {
    expect(endsWith("ab", "abc")).toBe(false);
  });

  it("should handle non-string inputs via toString", () => {
    expect(endsWith(12345, 45)).toBe(true);
    expect(endsWith(12345, 46)).toBe(false);
    expect(endsWith(null, "")).toBe(true);
    expect(endsWith(undefined, "")).toBe(true);
  });

  it("should handle symbols via toString", () => {
    expect(endsWith(Symbol("x"), "x)")).toBe(true);
  });

  it("should truncate non-integer position", () => {
    expect(endsWith("abc", "b", 2.9)).toBe(true);
    expect(endsWith("abc", "c", 2.9)).toBe(false);
  });

  it("should handle unicode strings", () => {
    expect(endsWith("Привет", "ет")).toBe(true);
    expect(endsWith("München", "hen")).toBe(true);
    expect(endsWith("汉字", "字")).toBe(true);
  });
});
