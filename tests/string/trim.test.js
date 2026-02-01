import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  trim,
} from "../../dist/index.js";

describe("trim function", () => {
  it("should trim whitespace by default", () => {
    expect(trim("  abc  ")).toBe("abc");
    expect(trim("\n\t abc \t\n")).toBe("abc");
    expect(trim(" \u00a0abc\u00a0 ")).toBe("abc");
  });

  it("should trim specified characters", () => {
    expect(trim("-_-abc-_-", "_-")).toBe("abc");
    expect(trim("...abc...", ".")).toBe("abc");
    expect(trim("xyxabcxy", "xy")).toBe("abc");
    expect(trim("$$$abc$$$", "$")).toBe("abc");
    expect(trim("abccba", "abc")).toBe("");
  });

  it("should handle empty chars", () => {
    expect(trim("  abc  ", "")).toBe("  abc  ");
  });

  it("should handle unicode symbols in chars", () => {
    expect(trim("✨✨abc✨✨", "✨")).toBe("abc");
    expect(trim("😊abc😊", "😊")).toBe("😊abc😊");
  });

  it("should handle non-string inputs via toString", () => {
    expect(trim(123)).toBe("123");
    expect(trim(-0)).toBe("-0");
    expect(trim([1, 2, 3])).toBe("1,2,3");
  });

  it("should handle null and undefined", () => {
    expect(trim(null)).toBe("");
    expect(trim(undefined)).toBe("");
  });
});
