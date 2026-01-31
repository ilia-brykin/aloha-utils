import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  startsWith,
} from "../../dist/index.js";

describe("startsWith function", () => {
  it("should check basic starts", () => {
    expect(startsWith("abc", "a")).toBe(true);
    expect(startsWith("abc", "b")).toBe(false);
    expect(startsWith("abc", "ab")).toBe(true);
    expect(startsWith("abc", "abc")).toBe(true);
  });

  it("should respect position argument", () => {
    expect(startsWith("abc", "b", 1)).toBe(true);
    expect(startsWith("abc", "a", 1)).toBe(false);
    expect(startsWith("abc", "c", 2)).toBe(true);
  });

  it("should handle position beyond length", () => {
    expect(startsWith("abc", "", 10)).toBe(true);
    expect(startsWith("abc", "a", 10)).toBe(false);
  });

  it("should handle negative position", () => {
    expect(startsWith("abc", "a", -1)).toBe(true);
    expect(startsWith("abc", "", -1)).toBe(true);
  });

  it("should handle empty target", () => {
    expect(startsWith("abc", "")).toBe(true);
    expect(startsWith("", "")).toBe(true);
  });

  it("should return false when target is longer than string", () => {
    expect(startsWith("ab", "abc")).toBe(false);
  });

  it("should handle non-string inputs via toString", () => {
    expect(startsWith(12345, 12)).toBe(true);
    expect(startsWith(12345, 23)).toBe(false);
    expect(startsWith(null, "")).toBe(true);
    expect(startsWith(undefined, "")).toBe(true);
  });

  it("should handle symbols via toString", () => {
    expect(startsWith(Symbol("x"), "Symbol(")).toBe(true);
  });

  it("should truncate non-integer position", () => {
    expect(startsWith("abc", "b", 1.9)).toBe(true);
    expect(startsWith("abc", "a", 1.9)).toBe(false);
  });

  it("should handle unicode strings", () => {
    expect(startsWith("Привет", "Пр")).toBe(true);
    expect(startsWith("München", "Mü")).toBe(true);
    expect(startsWith("汉字", "汉")).toBe(true);
  });
});
