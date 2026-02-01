import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  startCase,
} from "../../dist/index.js";

describe("startCase function", () => {
  it("should convert to start case", () => {
    expect(startCase("--foo-bar--")).toBe("Foo Bar");
    expect(startCase("fooBar")).toBe("Foo Bar");
    expect(startCase("__FOO_BAR__")).toBe("FOO BAR");
  });

  it("should handle punctuation and separators", () => {
    expect(startCase("foo.bar")).toBe("Foo Bar");
    expect(startCase("foo_bar-baz")).toBe("Foo Bar Baz");
    expect(startCase("foo/bar:baz")).toBe("Foo Bar Baz");
  });

  it("should remove apostrophes", () => {
    expect(startCase("foo's bar")).toBe("Foos Bar");
    expect(startCase("l\u2019été")).toBe("Lété");
  });

  it("should keep latin accents", () => {
    expect(startCase("déjà vu")).toBe("Déjà Vu");
    expect(startCase("MünchenIstSchön")).toBe("München Ist Schön");
  });

  it("should handle unicode letters", () => {
    expect(startCase("Привет мир")).toBe("Привет Мир");
    expect(startCase("漢字 テスト")).toBe("漢字 テスト");
  });

  it("should handle empty or whitespace strings", () => {
    expect(startCase("")).toBe("");
    expect(startCase("   ")).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(startCase(null)).toBe("");
    expect(startCase(undefined)).toBe("");
    expect(startCase(123)).toBe("123");
    expect(startCase(-0)).toBe("0");
    expect(startCase([1, 2, 3])).toBe("1 2 3");
  });
});
