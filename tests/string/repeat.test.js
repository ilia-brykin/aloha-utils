import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  repeat,
} from "../../dist/index.js";

describe("repeat function", () => {
  it("should repeat strings", () => {
    expect(repeat("*", 3)).toBe("***");
    expect(repeat("abc", 2)).toBe("abcabc");
    expect(repeat("abc", 0)).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(repeat(123, 2)).toBe("123123");
    expect(repeat(-0, 2)).toBe("-0-0");
    expect(repeat([1, 2], 2)).toBe("1,21,2");
    expect(repeat(Symbol("x"), 2)).toBe("Symbol(x)Symbol(x)");
  });

  it("should handle non-integer counts", () => {
    expect(repeat("a", 2.7)).toBe("aa");
    expect(repeat("a", "3")).toBe("aaa");
    expect(repeat("a", true)).toBe("a");
  });

  it("should return empty string for non-positive counts", () => {
    expect(repeat("a", -1)).toBe("");
    expect(repeat("a", 0)).toBe("");
    expect(repeat("a", NaN)).toBe("");
    expect(repeat("a", -0)).toBe("");
  });

  it("should handle empty or null inputs", () => {
    expect(repeat("", 5)).toBe("");
    expect(repeat(null, 3)).toBe("");
    expect(repeat(undefined, 3)).toBe("");
    expect(repeat("", 0)).toBe("");
  });

  it("should handle whitespace and unicode", () => {
    expect(repeat(" ", 3)).toBe("   ");
    expect(repeat("Привет", 2)).toBe("ПриветПривет");
    expect(repeat("😊", 3)).toBe("😊😊😊");
  });
});
