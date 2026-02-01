import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toLower,
} from "../../dist/index.js";

describe("toLower function", () => {
  it("should convert to lower case", () => {
    expect(toLower("--Foo-Bar--")).toBe("--foo-bar--");
    expect(toLower("fooBar")).toBe("foobar");
    expect(toLower("__FOO_BAR__")).toBe("__foo_bar__");
  });

  it("should handle empty and whitespace strings", () => {
    expect(toLower("")).toBe("");
    expect(toLower("   ")).toBe("   ");
    expect(toLower("\n\t")).toBe("\n\t");
  });

  it("should handle non-string inputs via toString", () => {
    expect(toLower(null)).toBe("");
    expect(toLower(undefined)).toBe("");
    expect(toLower(123)).toBe("123");
    expect(toLower(-0)).toBe("-0");
    expect(toLower([1, 2, 3])).toBe("1,2,3");
    expect(toLower(Symbol("X"))).toBe("symbol(x)");
  });

  it("should handle unicode and accents", () => {
    expect(toLower("ÄÖÜ")).toBe("äöü");
    expect(toLower("Привет")).toBe("привет");
    expect(toLower("İstanbul")).toBe("i̇stanbul");
  });

  it("should handle mixed content", () => {
    expect(toLower("FOO123BAR")).toBe("foo123bar");
    expect(toLower("Hello😊WORLD")).toBe("hello😊world");
    expect(toLower("München-IST-SCHÖN")).toBe("münchen-ist-schön");
  });
});
