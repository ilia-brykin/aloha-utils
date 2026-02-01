import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  trimStart,
} from "../../dist/index.js";

describe("trimStart function", () => {
  it("should trim leading whitespace by default", () => {
    expect(trimStart("  abc  ")).toBe("abc  ");
    expect(trimStart("\n\t abc \t\n")).toBe("abc \t\n");
    expect(trimStart(" \u00a0abc\u00a0 ")).toBe("abc\u00a0 ");
  });

  it("should trim specified characters", () => {
    expect(trimStart("-_-abc-_-", "_-")).toBe("abc-_-");
    expect(trimStart("...abc...", ".")).toBe("abc...");
    expect(trimStart("xyxabcxy", "xy")).toBe("abcxy");
    expect(trimStart("$$$abc$$$", "$")).toBe("abc$$$");
    expect(trimStart("abccba", "abc")).toBe("");
  });

  it("should handle empty chars", () => {
    expect(trimStart("  abc  ", "")).toBe("  abc  ");
  });

  it("should handle unicode symbols in chars", () => {
    expect(trimStart("✨✨abc✨✨", "✨")).toBe("abc✨✨");
    expect(trimStart("😊abc😊", "😊")).toBe("😊abc😊");
  });

  it("should handle non-string inputs via toString", () => {
    expect(trimStart(123)).toBe("123");
    expect(trimStart(-0)).toBe("-0");
    expect(trimStart([1, 2, 3])).toBe("1,2,3");
  });

  it("should handle null and undefined", () => {
    expect(trimStart(null)).toBe("");
    expect(trimStart(undefined)).toBe("");
  });
});
