import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  dropRightWhile,
} from "../../dist/index.js";

describe("dropRightWhile function", () => {
  const users = [
    { user: "barney", active: true },
    { user: "fred", active: false },
    { user: "pebbles", active: false },
  ];

  it("should drop while predicate returns truthy", () => {
    const result = dropRightWhile(users, value => !value.active);
    expect(result).toEqual([users[0]]);
  });

  it("should support matches shorthand", () => {
    const result = dropRightWhile(users, { user: "pebbles", active: false });
    expect(result).toEqual([users[0], users[1]]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = dropRightWhile(users, ["active", false]);
    expect(result).toEqual([users[0]]);
  });

  it("should support property shorthand", () => {
    const result = dropRightWhile(users, "active");
    expect(result).toEqual(users);
  });

  it("should pass index to predicate", () => {
    const result = dropRightWhile([1, 2, 3], (_value, index) => index > 1);
    expect(result).toEqual([1, 2]);
  });

  it("should use identity when predicate is omitted", () => {
    expect(dropRightWhile([1, 2, 0, 3])).toEqual([1, 2, 0]);
  });

  it("should handle empty array", () => {
    expect(dropRightWhile([], value => value)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(dropRightWhile(null, value => value)).toEqual([]);
    expect(dropRightWhile(undefined, value => value)).toEqual([]);
    expect(dropRightWhile({ a: 1 }, value => value)).toEqual([]);
  });
});
