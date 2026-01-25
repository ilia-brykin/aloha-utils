import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pascalCase,
} from "../../dist/index.js";

describe("pascalCase function", () => {
  it("should return empty string for non-strings", () => {
    expect(pascalCase(null)).toBe("");
    expect(pascalCase(undefined)).toBe("");
    expect(pascalCase(123)).toBe("");
    expect(pascalCase({})).toBe("");
  });

  it("should convert to PascalCase", () => {
    expect(pascalCase("foo bar")).toBe("FooBar");
    expect(pascalCase("Foo Bar")).toBe("FooBar");
    expect(pascalCase("__FOO_BAR__")).toBe("FooBar");
  });

  it("should handle mixed cases and numbers", () => {
    expect(pascalCase("fooBar")).toBe("FooBar");
    expect(pascalCase("fooBAR")).toBe("FooBar");
    expect(pascalCase("foo-bar-2-baz")).toBe("FooBar2Baz");
    expect(pascalCase("FOO2BAR")).toBe("Foo2Bar");
    expect(pascalCase("foo2bar")).toBe("Foo2bar");
  });

  it("should handle separators and punctuation", () => {
    expect(pascalCase("foo_bar")).toBe("FooBar");
    expect(pascalCase("foo.bar")).toBe("FooBar");
    expect(pascalCase("foo:bar")).toBe("FooBar");
    expect(pascalCase("foo/bar")).toBe("FooBar");
    expect(pascalCase("foo-bar_baz.qux")).toBe("FooBarBazQux");
  });

  it("should handle leading and trailing separators", () => {
    expect(pascalCase("---foo---")).toBe("Foo");
    expect(pascalCase("__foo__")).toBe("Foo");
    expect(pascalCase("  foo  ")).toBe("Foo");
  });

  it("should handle repeated separators", () => {
    expect(pascalCase("foo---bar")).toBe("FooBar");
    expect(pascalCase("foo___bar")).toBe("FooBar");
    expect(pascalCase("foo...bar")).toBe("FooBar");
  });

  it("should handle unicode letters", () => {
    expect(pascalCase("für dich")).toBe("FürDich");
    expect(pascalCase("München_ist_schön")).toBe("MünchenIstSchön");
  });

  it("should handle Cyrillic letters", () => {
    expect(pascalCase("привет мир")).toBe("ПриветМир");
    expect(pascalCase("моя-строка")).toBe("МояСтрока");
  });

  it("should return empty string for non-word input", () => {
    expect(pascalCase("")).toBe("");
    expect(pascalCase("   ")).toBe("");
    expect(pascalCase("---___...")).toBe("");
  });
});
