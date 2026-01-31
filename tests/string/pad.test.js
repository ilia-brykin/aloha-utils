import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pad,
} from "../../dist/index.js";

describe("pad function", () => {
  it("should pad both sides", () => {
    expect(pad("abc", 8)).toBe("  abc   ");
    expect(pad("abc", 8, "_-")).toBe("_-abc_-_");
    expect(pad("abc", 3)).toBe("abc");
    expect(pad("abc", 4)).toBe("abc ");
  });

  it("should handle odd padding lengths", () => {
    expect(pad("a", 4)).toBe(" a  ");
    expect(pad("a", 5)).toBe("  a  ");
    expect(pad("ab", 5)).toBe(" ab  ");
  });

  it("should truncate padding characters", () => {
    expect(pad("abc", 10, "01")).toBe("010abc0101");
    expect(pad("abc", 9, "01")).toBe("010abc010");
    expect(pad("abc", 7, "xyz")).toBe("xyabcxy");
  });

  it("should return original string when length is too small", () => {
    expect(pad("abc", 2)).toBe("abc");
    expect(pad("abc", 3)).toBe("abc");
  });

  it("should handle empty chars", () => {
    expect(pad("abc", 6, "")).toBe("abc");
  });

  it("should use default spaces when chars is undefined", () => {
    expect(pad("abc", 6, undefined)).toBe(" abc  ");
  });

  it("should handle negative or non-numeric length", () => {
    expect(pad("abc", -1)).toBe("abc");
    expect(pad("abc", NaN)).toBe("abc");
    expect(pad("abc", "5")).toBe(" abc ");
  });

  it("should handle non-string inputs via toString", () => {
    expect(pad(123, 5)).toBe(" 123 ");
    expect(pad(-0, 3)).toBe("-0 ");
    expect(pad([1, 2, 3], 8)).toBe(" 1,2,3  ");
  });

  it("should handle null and undefined", () => {
    expect(pad(null, 4)).toBe("    ");
    expect(pad(undefined, 4)).toBe("    ");
  });
});
