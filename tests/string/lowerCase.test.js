import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  lowerCase,
} from "../../dist/index.js";

describe("lowerCase function", () => {
  it("should convert to lower case words", () => {
    expect(lowerCase("--Foo-Bar--")).toBe("foo bar");
    expect(lowerCase("fooBar")).toBe("foo bar");
    expect(lowerCase("__FOO_BAR__")).toBe("foo bar");
  });

  it("should handle punctuation and separators", () => {
    expect(lowerCase("foo.bar")).toBe("foo bar");
    expect(lowerCase("foo_bar-baz")).toBe("foo bar baz");
    expect(lowerCase("foo/bar:baz")).toBe("foo bar baz");
    expect(lowerCase("foo--bar__baz..qux")).toBe("foo bar baz qux");
  });

  it("should remove apostrophes", () => {
    expect(lowerCase("Foo's Bar")).toBe("foos bar");
    expect(lowerCase("l\u2019été")).toBe("lété");
  });

  it("should keep latin accents", () => {
    expect(lowerCase("déjà vu")).toBe("déjà vu");
    expect(lowerCase("MünchenIstSchön")).toBe("münchen ist schön");
    expect(lowerCase("CAFÉNOIR")).toBe("cafénoir");
  });

  it("should handle unicode letters", () => {
    expect(lowerCase("Привет Мир")).toBe("привет мир");
    expect(lowerCase("漢字 テスト")).toBe("漢字 テスト");
    expect(lowerCase("İstanbul")).toBe("i̇stanbul");
  });

  it("should handle empty or whitespace strings", () => {
    expect(lowerCase("")).toBe("");
    expect(lowerCase("   ")).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(lowerCase(null)).toBe("");
    expect(lowerCase(undefined)).toBe("");
    expect(lowerCase(123)).toBe("123");
    expect(lowerCase(-0)).toBe("0");
    expect(lowerCase([1, 2, 3])).toBe("1 2 3");
    expect(lowerCase(Symbol("x"))).toBe("symbol x");
  });

  it("should handle mixed alphanumerics", () => {
    expect(lowerCase("FOO2BAR")).toBe("foo2 bar");
    expect(lowerCase("foo2bar")).toBe("foo2bar");
    expect(lowerCase("v2APIResponse")).toBe("v2 apiresponse");
  });

  it("should handle leading/trailing separators", () => {
    expect(lowerCase("--foo--")).toBe("foo");
    expect(lowerCase("__foo__")).toBe("foo");
    expect(lowerCase("  foo  ")).toBe("foo");
  });

  it("should handle non-letter symbols within words", () => {
    expect(lowerCase("foo@bar")).toBe("foo bar");
    expect(lowerCase("foo#bar$baz")).toBe("foo bar baz");
  });

  it("should handle emoji and mixed content", () => {
    expect(lowerCase("Foo😊Bar")).toBe("foo bar");
    expect(lowerCase("Привет😊Мир")).toBe("привет мир");
  });
});
