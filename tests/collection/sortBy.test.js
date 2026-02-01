import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sortBy,
} from "../../dist/index.js";

describe("sortBy function", () => {
  it("should sort by iteratee", () => {
    const users = [
      { user: "fred", age: 48 },
      { user: "barney", age: 36 },
      { user: "fred", age: 30 },
      { user: "barney", age: 34 },
    ];
    const result = sortBy(users, [value => value.user]);
    expect(result).toEqual([
      { user: "barney", age: 36 },
      { user: "barney", age: 34 },
      { user: "fred", age: 48 },
      { user: "fred", age: 30 },
    ]);
  });

  it("should sort by property shorthand array", () => {
    const users = [
      { user: "fred", age: 48 },
      { user: "barney", age: 36 },
      { user: "fred", age: 30 },
      { user: "barney", age: 34 },
    ];
    const result = sortBy(users, ["user", "age"]);
    expect(result).toEqual([
      { user: "barney", age: 34 },
      { user: "barney", age: 36 },
      { user: "fred", age: 30 },
      { user: "fred", age: 48 },
    ]);
  });

  it("should handle object collections", () => {
    const result = sortBy({ a: 2, b: 1 }, value => value);
    expect(result).toEqual([1, 2]);
  });

  it("should handle empty collection", () => {
    expect(sortBy([])).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(sortBy(null)).toEqual([]);
    expect(sortBy(undefined)).toEqual([]);
  });
});
