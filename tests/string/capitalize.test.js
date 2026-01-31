import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  capitalize,
} from "../../dist/index.js";

describe("capitalize function", () => {
  it("should capitalize simple strings", () => {
    expect(capitalize("FRED")).toBe("Fred");
    expect(capitalize("fred")).toBe("Fred");
    expect(capitalize("fReD")).toBe("Fred");
    expect(capitalize("f")).toBe("F");
  });

  it("should lowercase the rest of the string", () => {
    expect(capitalize("FOO BAR")).toBe("Foo bar");
    expect(capitalize("FOO-BAR")).toBe("Foo-bar");
    expect(capitalize("FOO_bar")).toBe("Foo_bar");
  });

  it("should handle empty and whitespace strings", () => {
    expect(capitalize("")).toBe("");
    expect(capitalize("   ")).toBe("   ");
  });

  it("should handle numbers and symbols via toString", () => {
    expect(capitalize(123)).toBe("123");
    expect(capitalize(-0)).toBe("-0");
    expect(capitalize(Symbol("x"))).toBe("Symbol(x)");
  });

  it("should handle null and undefined", () => {
    expect(capitalize(null)).toBe("");
    expect(capitalize(undefined)).toBe("");
  });

  it("should handle arrays via toString", () => {
    expect(capitalize([1, 2, 3])).toBe("1,2,3");
    expect(capitalize(["FOO", "bAr"])).toBe("Foo,bar");
  });

  it("should handle unicode letters", () => {
    expect(capitalize("straße")).toBe("Straße");
    expect(capitalize("mÜnchen")).toBe("München");
    expect(capitalize("ёжик")).toBe("Ёжик");
  });

  it("should not trim or remove punctuation", () => {
    expect(capitalize("--FOO--")).toBe("--foo--");
    expect(capitalize("...BAR...")).toBe("...bar...");
  });

  it("should preserve first character even if non-letter", () => {
    expect(capitalize("1ABC")).toBe("1abc");
    expect(capitalize("_ABC")).toBe("_abc");
  });
});
