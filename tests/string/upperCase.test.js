import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  upperCase,
} from "../../dist/index.js";

describe("upperCase function", () => {
  it("should convert to upper case words", () => {
    expect(upperCase("--foo-bar")).toBe("FOO BAR");
    expect(upperCase("fooBar")).toBe("FOO BAR");
    expect(upperCase("__foo_bar__")).toBe("FOO BAR");
  });

  it("should handle punctuation and separators", () => {
    expect(upperCase("foo.bar")).toBe("FOO BAR");
    expect(upperCase("foo_bar-baz")).toBe("FOO BAR BAZ");
    expect(upperCase("foo/bar:baz")).toBe("FOO BAR BAZ");
  });

  it("should remove apostrophes", () => {
    expect(upperCase("foo's bar")).toBe("FOOS BAR");
    expect(upperCase("l\u2019été")).toBe("LÉTÉ");
  });

  it("should handle unicode letters", () => {
    expect(upperCase("привет мир")).toBe("ПРИВЕТ МИР");
    expect(upperCase("漢字 テスト")).toBe("漢字 テスト");
  });

  it("should handle empty or whitespace strings", () => {
    expect(upperCase("")).toBe("");
    expect(upperCase("   ")).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(upperCase(null)).toBe("");
    expect(upperCase(undefined)).toBe("");
    expect(upperCase(123)).toBe("123");
    expect(upperCase(-0)).toBe("0");
    expect(upperCase([1, 2, 3])).toBe("1 2 3");
  });
});
