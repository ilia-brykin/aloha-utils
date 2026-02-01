import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  includes,
} from "../../dist/index.js";

describe("includes function", () => {
  it("should check arrays", () => {
    expect(includes([1, 2, 3], 1)).toBe(true);
    expect(includes([1, 2, 3], 1, 2)).toBe(false);
  });

  it("should check objects", () => {
    expect(includes({ a: 1, b: 2 }, 1)).toBe(true);
    expect(includes({ a: 1, b: 2 }, 3)).toBe(false);
  });

  it("should check strings", () => {
    expect(includes("abcd", "bc")).toBe(true);
    expect(includes("abcd", "bc", 2)).toBe(false);
  });

  it("should handle negative fromIndex", () => {
    expect(includes([1, 2, 3], 1, -1)).toBe(false);
    expect(includes("abcd", "a", -4)).toBe(true);
  });

  it("should handle nullish collection", () => {
    expect(includes(null, 1)).toBe(false);
    expect(includes(undefined, 1)).toBe(false);
  });
});
