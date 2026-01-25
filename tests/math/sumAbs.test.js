import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sumAbs,
} from "../../dist/index.js";

describe("sumAbs function", () => {
  it("should return undefined with no arguments", () => {
    expect(sumAbs()).toBe(undefined);
  });

  it("should return undefined for empty array", () => {
    expect(sumAbs([])).toBe(undefined);
  });

  it("should return sum of absolute values from arguments", () => {
    expect(sumAbs(1, -2, 3)).toBe(6);
    expect(sumAbs(-1, -2, -3)).toBe(6);
    expect(sumAbs(1, Infinity, -2)).toBe(Infinity);
    expect(sumAbs(0, -0)).toBe(0);
    expect(sumAbs(0.5, -0.5)).toBe(1);
  });

  it("should return sum of absolute values from first array argument", () => {
    expect(sumAbs([1, -2, 3])).toBe(6);
    expect(sumAbs([1, -2, 3], 10)).toBe(6);
  });

  it("should return undefined when no numeric values exist", () => {
    expect(sumAbs("a", null, undefined, NaN)).toBe(undefined);
    expect(sumAbs([NaN, "a", null])).toBe(undefined);
  });

  it("should ignore non-number values", () => {
    expect(sumAbs(1, "2", -3)).toBe(4);
    expect(sumAbs([1, "2", -3])).toBe(4);
    expect(sumAbs([null, -5, undefined, 2])).toBe(7);
  });
});
