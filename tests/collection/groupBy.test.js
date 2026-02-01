import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  groupBy,
} from "../../dist/index.js";

describe("groupBy function", () => {
  it("should group by iteratee result", () => {
    expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
      "4": [4.2],
      "6": [6.1, 6.3],
    });
  });

  it("should support property iteratee shorthand", () => {
    expect(groupBy(["one", "two", "three"], "length")).toEqual({
      "3": ["one", "two"],
      "5": ["three"],
    });
  });

  it("should handle object collections", () => {
    const result = groupBy({ a: 1, b: 2, c: 1 }, value => value);
    expect(result).toEqual({ "1": [1, 1], "2": [2] });
  });

  it("should handle empty collection", () => {
    expect(groupBy([])).toEqual({});
  });

  it("should handle nullish collection", () => {
    expect(groupBy(null)).toEqual({});
    expect(groupBy(undefined)).toEqual({});
  });
});
