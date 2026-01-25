import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  floor,
} from "../../dist/index.js";

describe("floor function", () => {
  it("should return undefined for non-numbers", () => {
    expect(floor("4.006")).toBe(undefined);
    expect(floor(null)).toBe(undefined);
    expect(floor(undefined)).toBe(undefined);
    expect(floor(NaN)).toBe(undefined);
    expect(floor({})).toBe(undefined);
    expect(floor([])).toBe(undefined);
  });

  it("should round down to precision", () => {
    expect(floor(4.006)).toBe(4);
    expect(floor(0.046, 2)).toBe(0.04);
    expect(floor(4060, -2)).toBe(4000);
    expect(floor(-4.006)).toBe(-5);
    expect(floor(-4.006, 2)).toBe(-4.01);
    expect(floor(1.009, 2)).toBe(1);
    expect(floor(10, 3)).toBe(10);
    expect(floor(10, -1)).toBe(10);
  });

  it("should treat invalid precision as 0", () => {
    expect(floor(4.006, "2")).toBe(4);
    expect(floor(4.006, 1.5)).toBe(4);
    expect(floor(4.006, NaN)).toBe(4);
    expect(floor(4.006, Infinity)).toBe(4);
    expect(floor(4.006, -Infinity)).toBe(4);
  });

  it("should handle precision edges", () => {
    expect(floor(0)).toBe(0);
    expect(floor(-0)).toBe(-0);
    expect(floor(0.0004, 3)).toBe(0);
    expect(floor(0.0004, -3)).toBe(0);
  });
});
