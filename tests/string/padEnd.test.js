import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  padEnd,
} from "../../dist/index.js";

describe("padEnd function", () => {
  it("should pad the right side", () => {
    expect(padEnd("abc", 6)).toBe("abc   ");
    expect(padEnd("abc", 6, "_-")).toBe("abc_-_");
    expect(padEnd("abc", 3)).toBe("abc");
    expect(padEnd("abc", 4)).toBe("abc ");
  });

  it("should truncate padding characters", () => {
    expect(padEnd("abc", 8, "01")).toBe("abc01010");
    expect(padEnd("abc", 7, "01")).toBe("abc0101");
    expect(padEnd("abc", 6, "xyz")).toBe("abcxyz");
  });

  it("should return original string when length is too small", () => {
    expect(padEnd("abc", 2)).toBe("abc");
    expect(padEnd("abc", 3)).toBe("abc");
  });

  it("should handle empty chars", () => {
    expect(padEnd("abc", 6, "")).toBe("abc");
  });

  it("should use default spaces when chars is undefined", () => {
    expect(padEnd("abc", 6, undefined)).toBe("abc   ");
  });

  it("should handle negative or non-numeric length", () => {
    expect(padEnd("abc", -1)).toBe("abc");
    expect(padEnd("abc", NaN)).toBe("abc");
    expect(padEnd("abc", "5")).toBe("abc  ");
  });

  it("should handle non-string inputs via toString", () => {
    expect(padEnd(123, 5)).toBe("123  ");
    expect(padEnd(-0, 3)).toBe("-0 ");
    expect(padEnd([1, 2, 3], 8)).toBe("1,2,3   ");
  });

  it("should handle null and undefined", () => {
    expect(padEnd(null, 4)).toBe("    ");
    expect(padEnd(undefined, 4)).toBe("    ");
  });
});
