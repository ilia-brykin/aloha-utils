import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  every,
} from "../../dist/index.js";

describe("every function", () => {
  it("should return true if all elements pass predicate", () => {
    expect(every([2, 4, 6], value => value % 2 === 0)).toBe(true);
  });

  it("should return false if any element fails predicate", () => {
    expect(every([2, 3, 4], value => value % 2 === 0)).toBe(false);
  });

  it("should support matches shorthand", () => {
    const users = [{ active: true }, { active: true }, { active: false }];
    expect(every(users, { active: true })).toBe(false);
  });

  it("should support matchesProperty shorthand", () => {
    const users = [{ active: false }, { active: false }];
    expect(every(users, ["active", false])).toBe(true);
  });

  it("should support property shorthand", () => {
    const users = [{ active: true }, { active: false }];
    expect(every(users, "active")).toBe(false);
  });

  it("should handle object collections", () => {
    expect(every({ a: 2, b: 4 }, value => value % 2 === 0)).toBe(true);
  });

  it("should return true for empty collections", () => {
    expect(every([])).toBe(true);
    expect(every({})).toBe(true);
  });

  it("should return true for nullish collection", () => {
    expect(every(null)).toBe(true);
    expect(every(undefined)).toBe(true);
  });
});
