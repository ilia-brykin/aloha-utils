import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  findLastKey,
} from "../../dist/index.js";

describe("findLastKey function", () => {
  const users = {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  };

  it("returns key for predicate function from right to left", () => {
    expect(findLastKey(users, value => value.age < 40)).toBe("pebbles");
  });

  it("supports matches shorthand", () => {
    expect(findLastKey(users, { age: 36, active: true })).toBe("barney");
  });

  it("supports matchesProperty shorthand", () => {
    expect(findLastKey(users, ["active", false])).toBe("fred");
  });

  it("supports property shorthand", () => {
    expect(findLastKey(users, "active")).toBe("pebbles");
  });
});
