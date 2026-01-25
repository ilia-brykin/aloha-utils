import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  mean,
} from "../../dist/index.js";

describe("mean function", () => {
  it("should return undefined with no arguments", () => {
    expect(mean()).toBe(undefined);
  });

  it("should return undefined for empty array", () => {
    expect(mean([])).toBe(undefined);
  });

  it("should return mean from arguments", () => {
    expect(mean(1, 2, 3)).toBe(2);
    expect(mean(-1, -2, -3)).toBe(-2);
    expect(mean(1, Infinity, 2)).toBe(Infinity);
    expect(mean(1.5, 2.5)).toBe(2);
    expect(mean(0.1, 0.2)).toBe(0.15000000000000002);
  });

  it("should return mean from first array argument", () => {
    expect(mean([1, 2, 3])).toBe(2);
    expect(mean([1, 2, 3], 10)).toBe(2);
  });

  it("should return undefined when no numeric values exist", () => {
    expect(mean("a", null, undefined, NaN)).toBe(undefined);
    expect(mean([NaN, "a", null])).toBe(undefined);
  });

  it("should ignore non-number values", () => {
    expect(mean(1, "2", 3)).toBe(2);
    expect(mean([1, "2", 3])).toBe(2);
    expect(mean([1.5, "x", 2.5])).toBe(2);
  });

  it("should handle edge numeric cases", () => {
    expect(mean(0, -0)).toBe(0);
    expect(mean([0, 0, 0])).toBe(0);
    expect(mean([Number.MAX_VALUE, Number.MAX_VALUE])).toBe(Infinity);
  });
});
