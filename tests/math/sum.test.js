import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sum,
} from "../../dist/index.js";

describe("sum function", () => {
  it("should return undefined with no arguments", () => {
    expect(sum()).toBe(undefined);
  });

  it("should return undefined for empty array", () => {
    expect(sum([])).toBe(undefined);
  });

  it("should return sum from arguments", () => {
    expect(sum(1, 2, 3)).toBe(6);
    expect(sum(-1, -2, -3)).toBe(-6);
    expect(sum(1, Infinity, 2)).toBe(Infinity);
  });

  it("should return sum from first array argument", () => {
    expect(sum([1, 2, 3])).toBe(6);
    expect(sum([1, 2, 3], 10)).toBe(6);
  });

  it("should return undefined when no numeric values exist", () => {
    expect(sum("a", null, undefined, NaN)).toBe(undefined);
    expect(sum([NaN, "a", null])).toBe(undefined);
  });

  it("should ignore non-number values", () => {
    expect(sum(1, "2", 3)).toBe(4);
    expect(sum([1, "2", 3])).toBe(4);
  });
});
