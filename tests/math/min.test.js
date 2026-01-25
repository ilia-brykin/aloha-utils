import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  min,
} from "../../dist/index.js";

describe("min function", () => {
  it("should return undefined with no arguments", () => {
    expect(min()).toBe(undefined);
  });

  it("should return undefined for empty array", () => {
    expect(min([])).toBe(undefined);
  });

  it("should return min from arguments", () => {
    expect(min(1, 3, 2)).toBe(1);
    expect(min(-1, -3, -2)).toBe(-3);
    expect(min(1, -Infinity, 2)).toBe(-Infinity);
    expect(min(0, -0)).toBe(0);
  });

  it("should return min from first array argument", () => {
    expect(min([1, 3, 2])).toBe(1);
    expect(min([1, 3, 2], -10)).toBe(1);
  });

  it("should return undefined when no numeric values exist", () => {
    expect(min("a", null, undefined, NaN)).toBe(undefined);
    expect(min([NaN, "a", null])).toBe(undefined);
    expect(min([undefined, NaN, "x"])).toBe(undefined);
  });

  it("should ignore non-number values", () => {
    expect(min(1, "2", -3)).toBe(-3);
    expect(min([1, "2", -3])).toBe(-3);
    expect(min([null, -5, undefined, 2])).toBe(-5);
    expect(min([-Infinity, "x", 10])).toBe(-Infinity);
  });

  it("should return undefined for arrays with only non-numbers", () => {
    expect(min([false, "", null])).toBe(undefined);
  });
});
