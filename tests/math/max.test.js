import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  max,
} from "../../dist/index.js";

describe("max function", () => {
  it("should return undefined with no arguments", () => {
    expect(max()).toBe(undefined);
  });

  it("should return undefined for empty array", () => {
    expect(max([])).toBe(undefined);
  });

  it("should return max from arguments", () => {
    expect(max(1, 3, 2)).toBe(3);
    expect(max(-1, -3, -2)).toBe(-1);
    expect(max(1, Infinity, 2)).toBe(Infinity);
    expect(max(0, -0)).toBe(0);
  });

  it("should return max from first array argument", () => {
    expect(max([1, 3, 2])).toBe(3);
    expect(max([1, 3, 2], 10)).toBe(3);
  });

  it("should return undefined when no numeric values exist", () => {
    expect(max("a", null, undefined, NaN)).toBe(undefined);
    expect(max([NaN, "a", null])).toBe(undefined);
    expect(max([undefined, NaN, "x"])).toBe(undefined);
  });

  it("should ignore non-number values", () => {
    expect(max(1, "2", "3")).toBe(1);
    expect(max([1, "2", "3"])).toBe(1);
    expect(max([null, 5, undefined, 2])).toBe(5);
    expect(max([Infinity, "x", 10])).toBe(Infinity);
  });

  it("should return undefined for arrays with only non-numbers", () => {
    expect(max([false, "", null])).toBe(undefined);
  });
});
