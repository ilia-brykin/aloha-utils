import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  upperFirst,
} from "../../dist/index.js";

describe("upperFirst function", () => {
  it("should upper first character", () => {
    expect(upperFirst("fred")).toBe("Fred");
    expect(upperFirst("FRED")).toBe("FRED");
    expect(upperFirst("fRED")).toBe("FRED");
    expect(upperFirst("[aloha]")).toBe("[aloha]");
    expect(upperFirst("aloha!")).toBe("Aloha!");
  });

  it("should handle empty and whitespace strings", () => {
    expect(upperFirst("")).toBe("");
    expect(upperFirst("   ")).toBe("   ");
    expect(upperFirst("\n\t")).toBe("\n\t");
  });

  it("should handle non-string inputs via toString", () => {
    expect(upperFirst(null)).toBe("");
    expect(upperFirst(undefined)).toBe("");
    expect(upperFirst(123)).toBe("123");
    expect(upperFirst(-0)).toBe("-0");
    expect(upperFirst([1, 2, 3])).toBe("1,2,3");
    expect(upperFirst(Symbol("x"))).toBe("Symbol(x)");
  });

  it("should handle unicode strings", () => {
    expect(upperFirst("привет")).toBe("Привет");
    expect(upperFirst("äpfel")).toBe("Äpfel");
    expect(upperFirst("istanbul")).toBe("Istanbul");
    expect(upperFirst("汉字")).toBe("汉字");
  });
});
