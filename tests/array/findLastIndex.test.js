import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  findLastIndex,
} from "../../dist/index.js";

describe("findLastIndex function", () => {
  const users = [
    { user: "barney", active: true },
    { user: "fred", active: false },
    { user: "pebbles", active: false },
  ];

  it("should return index using predicate function", () => {
    expect(findLastIndex(users, value => value.user === "pebbles")).toBe(2);
  });

  it("should support matches shorthand", () => {
    expect(findLastIndex(users, { user: "barney", active: true })).toBe(0);
  });

  it("should support matchesProperty shorthand", () => {
    expect(findLastIndex(users, ["active", false])).toBe(2);
  });

  it("should support matchesProperty shorthand with path array", () => {
    const nested = [
      { meta: { active: true } },
      { meta: { active: false } },
      { meta: { active: false } },
    ];
    expect(findLastIndex(nested, [["meta", "active"], false])).toBe(2);
  });

  it("should support property shorthand", () => {
    expect(findLastIndex(users, "active")).toBe(0);
  });

  it("should respect fromIndex", () => {
    expect(findLastIndex(users, ["active", false], 1)).toBe(1);
  });

  it("should handle negative fromIndex", () => {
    expect(findLastIndex(users, ["active", false], -2)).toBe(1);
  });

  it("should handle fromIndex beyond length", () => {
    expect(findLastIndex(users, value => value.active, 10)).toBe(0);
  });

  it("should handle fractional fromIndex", () => {
    expect(findLastIndex(users, ["active", false], 1.9)).toBe(1);
  });

  it("should return -1 when no match", () => {
    expect(findLastIndex(users, { user: "unknown" })).toBe(-1);
  });

  it("should handle SameValueZero comparisons in matches", () => {
    const list = [{ value: 1 }, { value: NaN }];
    expect(findLastIndex(list, { value: NaN })).toBe(1);
  });

  it("should use identity when predicate omitted", () => {
    expect(findLastIndex([0, null, 2, 3])).toBe(3);
  });

  it("should handle empty array", () => {
    expect(findLastIndex([], value => value)).toBe(-1);
  });

  it("should handle non-array input", () => {
    expect(findLastIndex(null, value => value)).toBe(-1);
    expect(findLastIndex(undefined, value => value)).toBe(-1);
    expect(findLastIndex({ a: 1 }, value => value)).toBe(-1);
  });
});
