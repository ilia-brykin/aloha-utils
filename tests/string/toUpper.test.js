import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toUpper,
} from "../../dist/index.js";

describe("toUpper function", () => {
  it("should convert to upper case", () => {
    expect(toUpper("--foo-bar--")).toBe("--FOO-BAR--");
    expect(toUpper("fooBar")).toBe("FOOBAR");
    expect(toUpper("__foo_bar__")).toBe("__FOO_BAR__");
  });

  it("should handle empty and whitespace strings", () => {
    expect(toUpper("")).toBe("");
    expect(toUpper("   ")).toBe("   ");
    expect(toUpper("\n\t")).toBe("\n\t");
  });

  it("should handle non-string inputs via toString", () => {
    expect(toUpper(null)).toBe("");
    expect(toUpper(undefined)).toBe("");
    expect(toUpper(123)).toBe("123");
    expect(toUpper(-0)).toBe("-0");
    expect(toUpper([1, 2, 3])).toBe("1,2,3");
    expect(toUpper(Symbol("x"))).toBe("SYMBOL(X)");
  });

  it("should handle unicode and accents", () => {
    expect(toUpper("äöü")).toBe("ÄÖÜ");
    expect(toUpper("привет")).toBe("ПРИВЕТ");
    expect(toUpper("istanbul")).toBe("ISTANBUL");
  });

  it("should handle mixed content", () => {
    expect(toUpper("foo123bar")).toBe("FOO123BAR");
    expect(toUpper("Hello😊world")).toBe("HELLO😊WORLD");
    expect(toUpper("münchen-ist-schön")).toBe("MÜNCHEN-IST-SCHÖN");
  });
});
