import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  findKey,
} from "../../dist/index.js";

describe("findKey function", () => {
  const users = {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  };

  it("returns key for predicate function", () => {
    expect(findKey(users, value => value.age < 40)).toBe("barney");
  });

  it("supports matches shorthand", () => {
    expect(findKey(users, { age: 1, active: true })).toBe("pebbles");
  });

  it("supports matchesProperty shorthand", () => {
    expect(findKey(users, ["active", false])).toBe("fred");
  });

  it("supports property shorthand", () => {
    expect(findKey(users, "active")).toBe("barney");
  });

  it("returns undefined when no match", () => {
    expect(findKey(users, { age: 100 })).toBeUndefined();
  });
});
