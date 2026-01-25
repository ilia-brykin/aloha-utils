import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  round,
} from "../../dist/index.js";

describe("round function", () => {
  it("should return undefined for non-numbers", () => {
    expect(round("4.006")).toBe(undefined);
    expect(round(null)).toBe(undefined);
    expect(round(undefined)).toBe(undefined);
    expect(round(NaN)).toBe(undefined);
    expect(round({})).toBe(undefined);
    expect(round([])).toBe(undefined);
  });

  it("should round to precision", () => {
    expect(round(4.006)).toBe(4);
    expect(round(4.006, 2)).toBe(4.01);
    expect(round(4060, -2)).toBe(4100);
    expect(round(-4.006)).toBe(-4);
    expect(round(-4.006, 2)).toBe(-4.01);
    expect(round(1.005, 2)).toBe(1);
    expect(round(10, 3)).toBe(10);
    expect(round(10, -1)).toBe(10);
  });

  it("should treat invalid precision as 0", () => {
    expect(round(4.006, "2")).toBe(4);
    expect(round(4.006, 1.5)).toBe(4);
    expect(round(4.006, NaN)).toBe(4);
    expect(round(4.006, Infinity)).toBe(4);
    expect(round(4.006, -Infinity)).toBe(4);
  });

  it("should handle precision edges", () => {
    expect(round(0)).toBe(0);
    expect(round(-0)).toBe(-0);
    expect(round(0.0004, 3)).toBe(0);
    expect(round(0.0004, -3)).toBe(0);
  });
});
