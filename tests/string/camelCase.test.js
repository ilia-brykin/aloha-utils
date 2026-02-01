import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  camelCase,
} from "../../dist/index.js";

describe("camelCase function", () => {
  it("should return empty string for non-strings", () => {
    expect(camelCase(null)).toBe("");
    expect(camelCase(undefined)).toBe("");
    expect(camelCase(123)).toBe("123");
    expect(camelCase({})).toBe("objectObject");
  });

  it("should convert to camelCase", () => {
    expect(camelCase("Foo Bar")).toBe("fooBar");
    expect(camelCase("--foo-bar--")).toBe("fooBar");
    expect(camelCase("__FOO_BAR__")).toBe("fooBar");
  });

  it("should handle mixed cases and numbers", () => {
    expect(camelCase("fooBar")).toBe("fooBar");
    expect(camelCase("fooBAR")).toBe("fooBar");
    expect(camelCase("foo-bar-2-baz")).toBe("fooBar2Baz");
    expect(camelCase("FOO2BAR")).toBe("foo2Bar");
    expect(camelCase("foo2bar")).toBe("foo2bar");
  });

  it("should handle separators and punctuation", () => {
    expect(camelCase("foo_bar")).toBe("fooBar");
    expect(camelCase("foo.bar")).toBe("fooBar");
    expect(camelCase("foo:bar")).toBe("fooBar");
    expect(camelCase("foo/bar")).toBe("fooBar");
    expect(camelCase("foo-bar_baz.qux")).toBe("fooBarBazQux");
  });

  it("should handle leading and trailing separators", () => {
    expect(camelCase("---foo---")).toBe("foo");
    expect(camelCase("__foo__")).toBe("foo");
    expect(camelCase("  foo  ")).toBe("foo");
  });

  it("should handle repeated separators", () => {
    expect(camelCase("foo---bar")).toBe("fooBar");
    expect(camelCase("foo___bar")).toBe("fooBar");
    expect(camelCase("foo...bar")).toBe("fooBar");
  });

  it("should handle unicode letters", () => {
    expect(camelCase("für dich")).toBe("fürDich");
    expect(camelCase("München_ist_schön")).toBe("münchenIstSchön");
  });

  it("should handle Cyrillic letters", () => {
    expect(camelCase("привет мир")).toBe("приветМир");
    expect(camelCase("моя-строка")).toBe("мояСтрока");
  });

  it("should return empty string for non-word input", () => {
    expect(camelCase("")).toBe("");
    expect(camelCase("   ")).toBe("");
    expect(camelCase("---___...")).toBe("");
  });
});
