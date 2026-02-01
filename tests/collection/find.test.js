import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  find,
} from "../../dist/index.js";

describe("find function", () => {
  const users = [
    { user: "barney", age: 36, active: true },
    { user: "fred", age: 40, active: false },
    { user: "pebbles", age: 1, active: true },
  ];

  it("should find first match using predicate", () => {
    const result = find(users, value => value.age < 40);
    expect(result).toEqual(users[0]);
  });

  it("should support matches shorthand", () => {
    const result = find(users, { age: 1, active: true });
    expect(result).toEqual(users[2]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = find(users, ["active", false]);
    expect(result).toEqual(users[1]);
  });

  it("should support property shorthand", () => {
    const result = find(users, "active");
    expect(result).toEqual(users[0]);
  });

  it("should respect fromIndex for arrays", () => {
    const result = find(users, "active", 1);
    expect(result).toEqual(users[2]);
  });

  it("should work with object collections", () => {
    const result = find({ a: 1, b: 2, c: 3 }, value => value > 1);
    expect(result).toBe(2);
  });

  it("should return undefined when no match", () => {
    const result = find(users, { user: "nobody" });
    expect(result).toBeUndefined();
  });

  it("should handle nullish collection", () => {
    expect(find(null, () => true)).toBeUndefined();
    expect(find(undefined, () => true)).toBeUndefined();
  });
});
