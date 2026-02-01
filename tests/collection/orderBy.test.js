import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  orderBy,
} from "../../dist/index.js";

describe("orderBy function", () => {
  it("should sort by multiple iteratees and orders", () => {
    const users = [
      { user: "fred", age: 48 },
      { user: "barney", age: 34 },
      { user: "fred", age: 40 },
      { user: "barney", age: 36 },
    ];
    const result = orderBy(users, ["user", "age"], ["asc", "desc"]);
    expect(result).toEqual([
      { user: "barney", age: 36 },
      { user: "barney", age: 34 },
      { user: "fred", age: 48 },
      { user: "fred", age: 40 },
    ]);
  });

  it("should default orders to ascending", () => {
    const result = orderBy([3, 1, 2], value => value);
    expect(result).toEqual([1, 2, 3]);
  });

  it("should handle object collections", () => {
    const result = orderBy({ a: 2, b: 1 }, value => value, "desc");
    expect(result).toEqual([2, 1]);
  });

  it("should handle empty collection", () => {
    expect(orderBy([])).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(orderBy(null)).toEqual([]);
    expect(orderBy(undefined)).toEqual([]);
  });
});
