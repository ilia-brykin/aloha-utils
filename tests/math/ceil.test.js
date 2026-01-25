import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  ceil,
} from "../../dist/index.js";

describe("ceil function", () => {
  it("should return undefined for non-numbers", () => {
    expect(ceil("4.006")).toBe(undefined);
    expect(ceil(null)).toBe(undefined);
    expect(ceil(undefined)).toBe(undefined);
    expect(ceil(NaN)).toBe(undefined);
    expect(ceil({})).toBe(undefined);
    expect(ceil([])).toBe(undefined);
  });

  it("should round up to precision", () => {
    expect(ceil(4.006)).toBe(5);
    expect(ceil(6.004, 2)).toBe(6.01);
    expect(ceil(6040, -2)).toBe(6100);
    expect(ceil(-4.006)).toBe(-4);
    expect(ceil(-4.006, 2)).toBe(-4);
    expect(ceil(1.001, 2)).toBe(1.01);
    expect(ceil(1.0001, 3)).toBe(1.001);
    expect(ceil(10, 3)).toBe(10);
    expect(ceil(10, -1)).toBe(10);
  });

  it("should treat invalid precision as 0", () => {
    expect(ceil(4.006, "2")).toBe(5);
    expect(ceil(4.006, 1.5)).toBe(5);
    expect(ceil(4.006, NaN)).toBe(5);
    expect(ceil(4.006, Infinity)).toBe(5);
    expect(ceil(4.006, -Infinity)).toBe(5);
  });

  it("should handle precision edges", () => {
    expect(ceil(0)).toBe(0);
    expect(ceil(-0)).toBe(-0);
    expect(ceil(0.0004, 3)).toBe(0.001);
    expect(ceil(0.0004, -3)).toBe(1000);
  });
});
