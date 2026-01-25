import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  kebabCase,
} from "../../dist/index.js";

describe("kebabCase function", () => {
  it("should return empty string for non-strings", () => {
    expect(kebabCase(null)).toBe("");
    expect(kebabCase(undefined)).toBe("");
    expect(kebabCase(123)).toBe("");
    expect(kebabCase({})).toBe("");
  });

  it("should convert to kebab-case", () => {
    expect(kebabCase("Foo Bar")).toBe("foo-bar");
    expect(kebabCase("fooBar")).toBe("foo-bar");
    expect(kebabCase("__FOO_BAR__")).toBe("foo-bar");
  });

  it("should handle mixed cases and numbers", () => {
    expect(kebabCase("fooBar")).toBe("foo-bar");
    expect(kebabCase("fooBAR")).toBe("foo-bar");
    expect(kebabCase("foo-bar-2-baz")).toBe("foo-bar-2-baz");
    expect(kebabCase("FOO2BAR")).toBe("foo2-bar");
    expect(kebabCase("foo2bar")).toBe("foo2bar");
  });

  it("should handle separators and punctuation", () => {
    expect(kebabCase("foo_bar")).toBe("foo-bar");
    expect(kebabCase("foo.bar")).toBe("foo-bar");
    expect(kebabCase("foo:bar")).toBe("foo-bar");
    expect(kebabCase("foo/bar")).toBe("foo-bar");
    expect(kebabCase("foo-bar_baz.qux")).toBe("foo-bar-baz-qux");
  });

  it("should handle leading and trailing separators", () => {
    expect(kebabCase("---foo---")).toBe("foo");
    expect(kebabCase("__foo__")).toBe("foo");
    expect(kebabCase("  foo  ")).toBe("foo");
  });

  it("should handle repeated separators", () => {
    expect(kebabCase("foo---bar")).toBe("foo-bar");
    expect(kebabCase("foo___bar")).toBe("foo-bar");
    expect(kebabCase("foo...bar")).toBe("foo-bar");
  });

  it("should handle unicode letters", () => {
    expect(kebabCase("für dich")).toBe("für-dich");
    expect(kebabCase("München_ist_schön")).toBe("münchen-ist-schön");
  });

  it("should handle Cyrillic letters", () => {
    expect(kebabCase("привет мир")).toBe("привет-мир");
    expect(kebabCase("моя-строка")).toBe("моя-строка");
  });

  it("should return empty string for non-word input", () => {
    expect(kebabCase("")).toBe("");
    expect(kebabCase("   ")).toBe("");
    expect(kebabCase("---___...")).toBe("");
  });
});
