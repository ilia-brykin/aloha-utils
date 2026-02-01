import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  dropWhile,
} from "../../dist/index.js";

describe("dropWhile function", () => {
  const users = [
    { user: "barney", active: false },
    { user: "fred", active: false },
    { user: "pebbles", active: true },
  ];

  it("should drop while predicate returns truthy", () => {
    const result = dropWhile(users, value => !value.active);
    expect(result).toEqual([users[2]]);
  });

  it("should support matches shorthand", () => {
    const result = dropWhile(users, { user: "barney", active: false });
    expect(result).toEqual([users[1], users[2]]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = dropWhile(users, ["active", false]);
    expect(result).toEqual([users[2]]);
  });

  it("should support property shorthand", () => {
    const result = dropWhile(users, "active");
    expect(result).toEqual(users);
  });

  it("should pass index to predicate", () => {
    expect(dropWhile([1, 2, 3], (_value, index) => index < 2)).toEqual([3]);
  });

  it("should use identity when predicate is omitted", () => {
    expect(dropWhile([1, 2, 0, 3])).toEqual([0, 3]);
  });

  it("should handle empty array", () => {
    expect(dropWhile([], value => value)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(dropWhile(null, value => value)).toEqual([]);
    expect(dropWhile(undefined, value => value)).toEqual([]);
    expect(dropWhile({ a: 1 }, value => value)).toEqual([]);
  });
});
