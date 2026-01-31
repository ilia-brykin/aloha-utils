import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  padStart,
} from "../../dist/index.js";

describe("padStart function", () => {
  it("should pad the left side", () => {
    expect(padStart("abc", 6)).toBe("   abc");
    expect(padStart("abc", 6, "_-")).toBe("_-_abc");
    expect(padStart("abc", 3)).toBe("abc");
    expect(padStart("abc", 4)).toBe(" abc");
  });

  it("should truncate padding characters", () => {
    expect(padStart("abc", 8, "01")).toBe("01010abc");
    expect(padStart("abc", 7, "01")).toBe("0101abc");
    expect(padStart("abc", 6, "xyz")).toBe("xyzabc");
  });

  it("should return original string when length is too small", () => {
    expect(padStart("abc", 2)).toBe("abc");
    expect(padStart("abc", 3)).toBe("abc");
  });

  it("should handle empty chars", () => {
    expect(padStart("abc", 6, "")).toBe("abc");
  });

  it("should use default spaces when chars is undefined", () => {
    expect(padStart("abc", 6, undefined)).toBe("   abc");
  });

  it("should handle negative or non-numeric length", () => {
    expect(padStart("abc", -1)).toBe("abc");
    expect(padStart("abc", NaN)).toBe("abc");
    expect(padStart("abc", "5")).toBe("  abc");
  });

  it("should handle non-string inputs via toString", () => {
    expect(padStart(123, 5)).toBe("  123");
    expect(padStart(-0, 3)).toBe(" -0");
    expect(padStart([1, 2, 3], 8)).toBe("   1,2,3");
  });

  it("should handle null and undefined", () => {
    expect(padStart(null, 4)).toBe("    ");
    expect(padStart(undefined, 4)).toBe("    ");
  });
});
