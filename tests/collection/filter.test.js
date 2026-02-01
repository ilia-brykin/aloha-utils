import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  filter,
} from "../../dist/index.js";

describe("filter function", () => {
  const users = [
    { user: "barney", age: 36, active: true },
    { user: "fred", age: 40, active: false },
  ];

  it("should filter using predicate", () => {
    const result = filter(users, value => !value.active);
    expect(result).toEqual([users[1]]);
  });

  it("should support matches shorthand", () => {
    const result = filter(users, { age: 36, active: true });
    expect(result).toEqual([users[0]]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = filter(users, ["active", false]);
    expect(result).toEqual([users[1]]);
  });

  it("should support property shorthand", () => {
    const result = filter(users, "active");
    expect(result).toEqual([users[0]]);
  });

  it("should handle object collections", () => {
    const result = filter({ a: 1, b: 2, c: 1 }, value => value === 1);
    expect(result).toEqual([1, 1]);
  });

  it("should handle empty collection", () => {
    expect(filter([])).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(filter(null)).toEqual([]);
    expect(filter(undefined)).toEqual([]);
  });
});
