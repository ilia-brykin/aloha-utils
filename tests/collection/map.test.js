import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  map,
} from "../../dist/index.js";

describe("map function", () => {
  it("should map array values", () => {
    expect(map([4, 8], value => value * value)).toEqual([16, 64]);
  });

  it("should map object values", () => {
    expect(map({ a: 4, b: 8 }, value => value * value)).toEqual([16, 64]);
  });

  it("should support property iteratee shorthand", () => {
    const users = [{ user: "barney" }, { user: "fred" }];
    expect(map(users, "user")).toEqual(["barney", "fred"]);
  });

  it("should handle empty collection", () => {
    expect(map([])).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(map(null)).toEqual([]);
    expect(map(undefined)).toEqual([]);
  });
});
