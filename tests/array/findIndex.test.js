import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  findIndex,
} from "../../dist/index.js";

describe("findIndex function", () => {
  const users = [
    { user: "barney", active: false },
    { user: "fred", active: false },
    { user: "pebbles", active: true },
  ];

  it("should return index using predicate function", () => {
    expect(findIndex(users, value => value.user === "barney")).toBe(0);
  });

  it("should support matches shorthand", () => {
    expect(findIndex(users, { user: "fred", active: false })).toBe(1);
  });

  it("should support matchesProperty shorthand", () => {
    expect(findIndex(users, ["active", false])).toBe(0);
  });

  it("should support matchesProperty shorthand with path array", () => {
    const nested = [
      { meta: { active: false } },
      { meta: { active: true } },
    ];
    expect(findIndex(nested, [["meta", "active"], true])).toBe(1);
  });

  it("should support property shorthand", () => {
    expect(findIndex(users, "active")).toBe(2);
  });

  it("should respect fromIndex", () => {
    expect(findIndex(users, ["active", false], 1)).toBe(1);
  });

  it("should handle negative fromIndex", () => {
    expect(findIndex(users, ["active", false], -2)).toBe(1);
  });

  it("should handle fromIndex beyond length", () => {
    expect(findIndex(users, value => value.active, 10)).toBe(-1);
  });

  it("should handle fractional fromIndex", () => {
    expect(findIndex(users, ["active", false], 0.9)).toBe(0);
  });

  it("should return -1 when no match", () => {
    expect(findIndex(users, { user: "unknown" })).toBe(-1);
  });

  it("should handle SameValueZero comparisons in matches", () => {
    const list = [{ value: NaN }, { value: 1 }];
    expect(findIndex(list, { value: NaN })).toBe(0);
  });

  it("should use identity when predicate omitted", () => {
    expect(findIndex([0, null, 2, 3])).toBe(2);
  });

  it("should handle empty array", () => {
    expect(findIndex([], value => value)).toBe(-1);
  });

  it("should handle non-array input", () => {
    expect(findIndex(null, value => value)).toBe(-1);
    expect(findIndex(undefined, value => value)).toBe(-1);
    expect(findIndex({ a: 1 }, value => value)).toBe(-1);
  });
});
