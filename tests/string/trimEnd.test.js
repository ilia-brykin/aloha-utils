import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  trimEnd,
} from "../../dist/index.js";

describe("trimEnd function", () => {
  it("should trim trailing whitespace by default", () => {
    expect(trimEnd("  abc  ")).toBe("  abc");
    expect(trimEnd("\n\t abc \t\n")).toBe("\n\t abc");
    expect(trimEnd(" \u00a0abc\u00a0 ")).toBe(" \u00a0abc");
  });

  it("should trim specified characters", () => {
    expect(trimEnd("-_-abc-_-", "_-")).toBe("-_-abc");
    expect(trimEnd("...abc...", ".")).toBe("...abc");
    expect(trimEnd("xyxabcxy", "xy")).toBe("xyxabc");
    expect(trimEnd("$$$abc$$$", "$")).toBe("$$$abc");
    expect(trimEnd("abccba", "abc")).toBe("");
  });

  it("should handle empty chars", () => {
    expect(trimEnd("  abc  ", "")).toBe("  abc  ");
  });

  it("should handle unicode symbols in chars", () => {
    expect(trimEnd("✨✨abc✨✨", "✨")).toBe("✨✨abc");
    expect(trimEnd("😊abc😊", "😊")).toBe("😊abc😊");
  });

  it("should handle non-string inputs via toString", () => {
    expect(trimEnd(123)).toBe("123");
    expect(trimEnd(-0)).toBe("-0");
    expect(trimEnd([1, 2, 3])).toBe("1,2,3");
  });

  it("should handle null and undefined", () => {
    expect(trimEnd(null)).toBe("");
    expect(trimEnd(undefined)).toBe("");
  });
});
