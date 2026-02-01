import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  takeWhile,
} from "../../dist/index.js";

describe("takeWhile function", () => {
  const users = [
    { user: "barney", active: false },
    { user: "fred", active: false },
    { user: "pebbles", active: true },
  ];

  it("should take while predicate returns truthy", () => {
    const result = takeWhile(users, value => !value.active);
    expect(result).toEqual([users[0], users[1]]);
  });

  it("should support matches shorthand", () => {
    const result = takeWhile(users, { user: "barney", active: false });
    expect(result).toEqual([users[0]]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = takeWhile(users, ["active", false]);
    expect(result).toEqual([users[0], users[1]]);
  });

  it("should support property shorthand", () => {
    const result = takeWhile(users, "active");
    expect(result).toEqual([]);
  });

  it("should use identity when predicate omitted", () => {
    expect(takeWhile([1, 2, 0, 3])).toEqual([1, 2]);
  });

  it("should handle empty array", () => {
    expect(takeWhile([], value => value)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(takeWhile(null, value => value)).toEqual([]);
    expect(takeWhile(undefined, value => value)).toEqual([]);
    expect(takeWhile({ a: 1 }, value => value)).toEqual([]);
  });
});
