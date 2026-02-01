import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  countBy,
} from "../../dist/index.js";

describe("countBy function", () => {
  it("should count by iteratee result", () => {
    expect(countBy([6.1, 4.2, 6.3], Math.floor)).toEqual({ "4": 1, "6": 2 });
  });

  it("should support property iteratee shorthand", () => {
    expect(countBy(["one", "two", "three"], "length")).toEqual({ "3": 2, "5": 1 });
  });

  it("should work with object collections", () => {
    const result = countBy({ a: 1, b: 2, c: 1 }, value => value);
    expect(result).toEqual({ "1": 2, "2": 1 });
  });

  it("should support matches shorthand", () => {
    const users = [{ active: true }, { active: false }, { active: true }];
    expect(countBy(users, { active: true })).toEqual({ "true": 2, "false": 1 });
  });

  it("should handle empty collection", () => {
    expect(countBy([])).toEqual({});
  });

  it("should handle nullish collection", () => {
    expect(countBy(null)).toEqual({});
    expect(countBy(undefined)).toEqual({});
  });
});
