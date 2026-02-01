import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  some,
} from "../../dist/index.js";

describe("some function", () => {
  it("should return true if any element passes predicate", () => {
    expect(some([null, 0, "yes", false], Boolean)).toBe(true);
  });

  it("should support matches shorthand", () => {
    const users = [{ active: true }, { active: false }];
    expect(some(users, { active: false })).toBe(true);
  });

  it("should support matchesProperty shorthand", () => {
    const users = [{ active: true }, { active: false }];
    expect(some(users, ["active", false])).toBe(true);
  });

  it("should support property shorthand", () => {
    const users = [{ active: true }, { active: false }];
    expect(some(users, "active")).toBe(true);
  });

  it("should handle object collections", () => {
    expect(some({ a: 0, b: 2 }, value => value > 1)).toBe(true);
  });

  it("should handle empty collection", () => {
    expect(some([])).toBe(false);
    expect(some({})).toBe(false);
  });

  it("should handle nullish collection", () => {
    expect(some(null)).toBe(false);
    expect(some(undefined)).toBe(false);
  });
});
