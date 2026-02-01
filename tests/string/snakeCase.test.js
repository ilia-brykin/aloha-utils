import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  snakeCase,
} from "../../dist/index.js";

describe("snakeCase function", () => {
  it("should return empty string for non-strings", () => {
    expect(snakeCase(null)).toBe("");
    expect(snakeCase(undefined)).toBe("");
    expect(snakeCase(123)).toBe("123");
    expect(snakeCase({})).toBe("object_object");
  });

  it("should convert to snake_case", () => {
    expect(snakeCase("Foo Bar")).toBe("foo_bar");
    expect(snakeCase("fooBar")).toBe("foo_bar");
    expect(snakeCase("--FOO-BAR--")).toBe("foo_bar");
  });

  it("should handle mixed cases and numbers", () => {
    expect(snakeCase("fooBar")).toBe("foo_bar");
    expect(snakeCase("fooBAR")).toBe("foo_bar");
    expect(snakeCase("foo-bar-2-baz")).toBe("foo_bar_2_baz");
    expect(snakeCase("FOO2BAR")).toBe("foo2_bar");
    expect(snakeCase("foo2bar")).toBe("foo2bar");
  });

  it("should handle separators and punctuation", () => {
    expect(snakeCase("foo_bar")).toBe("foo_bar");
    expect(snakeCase("foo.bar")).toBe("foo_bar");
    expect(snakeCase("foo:bar")).toBe("foo_bar");
    expect(snakeCase("foo/bar")).toBe("foo_bar");
    expect(snakeCase("foo-bar_baz.qux")).toBe("foo_bar_baz_qux");
  });

  it("should handle leading and trailing separators", () => {
    expect(snakeCase("---foo---")).toBe("foo");
    expect(snakeCase("__foo__")).toBe("foo");
    expect(snakeCase("  foo  ")).toBe("foo");
  });

  it("should handle repeated separators", () => {
    expect(snakeCase("foo---bar")).toBe("foo_bar");
    expect(snakeCase("foo___bar")).toBe("foo_bar");
    expect(snakeCase("foo...bar")).toBe("foo_bar");
  });

  it("should handle unicode letters", () => {
    expect(snakeCase("für dich")).toBe("für_dich");
    expect(snakeCase("München_ist_schön")).toBe("münchen_ist_schön");
  });

  it("should handle Cyrillic letters", () => {
    expect(snakeCase("привет мир")).toBe("привет_мир");
    expect(snakeCase("моя-строка")).toBe("моя_строка");
  });

  it("should return empty string for non-word input", () => {
    expect(snakeCase("")).toBe("");
    expect(snakeCase("   ")).toBe("");
    expect(snakeCase("---___...")).toBe("");
  });
});
