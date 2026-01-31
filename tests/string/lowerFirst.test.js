import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  lowerFirst,
} from "../../dist/index.js";

describe("lowerFirst function", () => {
  it("should lower first character", () => {
    expect(lowerFirst("Fred")).toBe("fred");
    expect(lowerFirst("FRED")).toBe("fRED");
    expect(lowerFirst("fRED")).toBe("fRED");
    expect(lowerFirst("[ALOHA]")).toBe("[ALOHA]");
    expect(lowerFirst("ALOHA!")).toBe("aLOHA!");
  });

  it("should handle empty and whitespace strings", () => {
    expect(lowerFirst("")).toBe("");
    expect(lowerFirst("   ")).toBe("   ");
    expect(lowerFirst("\n\t")).toBe("\n\t");
  });

  it("should handle non-string inputs via toString", () => {
    expect(lowerFirst(null)).toBe("");
    expect(lowerFirst(undefined)).toBe("");
    expect(lowerFirst(123)).toBe("123");
    expect(lowerFirst(-0)).toBe("-0");
    expect(lowerFirst([1, 2, 3])).toBe("1,2,3");
    expect(lowerFirst(Symbol("X"))).toBe("symbol(X)");
  });

  it("should handle unicode strings", () => {
    expect(lowerFirst("Привет")).toBe("привет");
    expect(lowerFirst("Äpfel")).toBe("äpfel");
    expect(lowerFirst("漢字")).toBe("漢字");
    expect(lowerFirst("İstanbul")).toBe("i̇stanbul");
  });

  it("should handle mixed punctuation and digits", () => {
    expect(lowerFirst("1ABC")).toBe("1ABC");
    expect(lowerFirst("_ABC")).toBe("_ABC");
    expect(lowerFirst("-ABC")).toBe("-ABC");
    expect(lowerFirst("9Z")).toBe("9Z");
  });
});
