import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  takeRightWhile,
} from "../../dist/index.js";

describe("takeRightWhile function", () => {
  const users = [
    { user: "barney", active: true },
    { user: "fred", active: false },
    { user: "pebbles", active: false },
  ];

  it("should take while predicate returns truthy from the end", () => {
    const result = takeRightWhile(users, value => !value.active);
    expect(result).toEqual([users[1], users[2]]);
  });

  it("should support matches shorthand", () => {
    const result = takeRightWhile(users, { user: "pebbles", active: false });
    expect(result).toEqual([users[2]]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = takeRightWhile(users, ["active", false]);
    expect(result).toEqual([users[1], users[2]]);
  });

  it("should support property shorthand", () => {
    const result = takeRightWhile(users, "active");
    expect(result).toEqual([]);
  });

  it("should use identity when predicate omitted", () => {
    expect(takeRightWhile([1, 2, 0, 3])).toEqual([3]);
  });

  it("should handle empty array", () => {
    expect(takeRightWhile([], value => value)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(takeRightWhile(null, value => value)).toEqual([]);
    expect(takeRightWhile(undefined, value => value)).toEqual([]);
    expect(takeRightWhile({ a: 1 }, value => value)).toEqual([]);
  });
});
