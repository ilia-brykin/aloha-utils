import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  partition,
} from "../../dist/index.js";

describe("partition function", () => {
  const users = [
    { user: "barney", age: 36, active: false },
    { user: "fred", age: 40, active: true },
    { user: "pebbles", age: 1, active: false },
  ];

  it("should partition using predicate", () => {
    const result = partition(users, value => value.active);
    expect(result).toEqual([[users[1]], [users[0], users[2]]]);
  });

  it("should support matches shorthand", () => {
    const result = partition(users, { age: 1, active: false });
    expect(result).toEqual([[users[2]], [users[0], users[1]]]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = partition(users, ["active", false]);
    expect(result).toEqual([[users[0], users[2]], [users[1]]]);
  });

  it("should support property shorthand", () => {
    const result = partition(users, "active");
    expect(result).toEqual([[users[1]], [users[0], users[2]]]);
  });

  it("should handle object collections", () => {
    const result = partition({ a: 1, b: 2, c: 1 }, value => value === 1);
    expect(result).toEqual([[1, 1], [2]]);
  });

  it("should handle empty collection", () => {
    expect(partition([])).toEqual([[], []]);
  });

  it("should handle nullish collection", () => {
    expect(partition(null)).toEqual([[], []]);
    expect(partition(undefined)).toEqual([[], []]);
  });
});
