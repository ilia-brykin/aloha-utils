import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  reject,
} from "../../dist/index.js";

describe("reject function", () => {
  const users = [
    { user: "barney", age: 36, active: false },
    { user: "fred", age: 40, active: true },
  ];

  it("should reject using predicate", () => {
    const result = reject(users, value => !value.active);
    expect(result).toEqual([users[1]]);
  });

  it("should support matches shorthand", () => {
    const result = reject(users, { age: 40, active: true });
    expect(result).toEqual([users[0]]);
  });

  it("should support matchesProperty shorthand", () => {
    const result = reject(users, ["active", false]);
    expect(result).toEqual([users[1]]);
  });

  it("should support property shorthand", () => {
    const result = reject(users, "active");
    expect(result).toEqual([users[0]]);
  });

  it("should handle nullish collection", () => {
    expect(reject(null)).toEqual([]);
    expect(reject(undefined)).toEqual([]);
  });
});
