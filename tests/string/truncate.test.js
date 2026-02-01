import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  truncate,
} from "../../dist/index.js";

describe("truncate function", () => {
  it("should truncate with default length and omission", () => {
    expect(truncate("hi-diddly-ho there, neighborino"))
      .toBe("hi-diddly-ho there, neighbo...");
  });

  it("should respect custom length", () => {
    expect(truncate("hi-diddly-ho there, neighborino", { length: 24 }))
      .toBe("hi-diddly-ho there, n...");
    expect(truncate("hi-diddly-ho there, neighborino", { length: 5 }))
      .toBe("hi...");
  });

  it("should use string separator", () => {
    expect(truncate("hi-diddly-ho there, neighborino", {
      length: 24,
      separator: " ",
    })).toBe("hi-diddly-ho there,..."); 
    expect(truncate("alpha-beta-gamma", {
      length: 12,
      separator: "-",
    })).toBe("alpha...");
  });

  it("should use regex separator", () => {
    expect(truncate("hi-diddly-ho there, neighborino", {
      length: 24,
      separator: /,? +/,
    })).toBe("hi-diddly-ho there...");
    expect(truncate("one,two,three,four", {
      length: 12,
      separator: /, ?/,
    })).toBe("one,two...");
  });

  it("should use custom omission", () => {
    expect(truncate("hi-diddly-ho there, neighborino", {
      omission: " [...]",
    })).toBe("hi-diddly-ho there, neig [...]");
    expect(truncate("abcdefg", {
      length: 6,
      omission: "…",
    })).toBe("abcde…");
  });

  it("should return original string when shorter than length", () => {
    expect(truncate("short", { length: 10 })).toBe("short");
    expect(truncate("short", { length: 5 })).toBe("short");
  });

  it("should handle small length", () => {
    expect(truncate("abcdef", { length: 3 })).toBe("...");
    expect(truncate("abcdef", { length: 2 })).toBe("..");
    expect(truncate("abcdef", { length: 1 })).toBe(".");
    expect(truncate("abcdef", { length: 0 })).toBe("");
    expect(truncate("abcdef", { length: -5 })).toBe("");
  });

  it("should handle non-string inputs via toString", () => {
    expect(truncate(12345, { length: 4 })).toBe("1...");
    expect(truncate(-0, { length: 2 })).toBe("-0");
    expect(truncate([1, 2, 3], { length: 5 })).toBe("1,2,3");
  });

  it("should handle empty or invalid options", () => {
    expect(truncate("abc", {})).toBe("abc");
    expect(truncate("abc", { length: NaN })).toBe("");
    expect(truncate("abc", { length: undefined })).toBe("abc");
    expect(truncate("abc", { omission: "" })).toBe("abc");
  });

  it("should handle unicode and emoji", () => {
    expect(truncate("Привет мир", { length: 8 })).toBe("Приве...");
    expect(truncate("😊😊😊😊", { length: 5 })).toBe("😊...");
    expect(truncate("MünchenIstSchön", { length: 10 })).toBe("München...");
  });

  it("should handle separator not found", () => {
    expect(truncate("abcdefg", { length: 5, separator: " " })).toBe("ab...");
  });

  it("should not throw on empty string", () => {
    expect(truncate("", { length: 5 })).toBe("");
  });
});
