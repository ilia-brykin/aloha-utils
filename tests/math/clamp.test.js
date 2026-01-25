import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  clamp,
} from "../../dist/index.js";

describe("clamp function", () => {
  it("should return undefined for invalid arguments", () => {
    expect(clamp("1", 0, 10)).toBe(undefined);
    expect(clamp(1, "0", 10)).toBe(undefined);
    expect(clamp(1, 0, "10")).toBe(undefined);
    expect(clamp(NaN, 0, 10)).toBe(undefined);
    expect(clamp(1, NaN, 10)).toBe(undefined);
    expect(clamp(1, 0, NaN)).toBe(undefined);
    expect(clamp(1, 10, 0)).toBe(undefined);
  });

  it("should clamp within the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-2, 0, 10)).toBe(0);
    expect(clamp(12, 0, 10)).toBe(10);
    expect(clamp(5, -10, -1)).toBe(-1);
    expect(clamp(-5, -10, -1)).toBe(-5);
    expect(clamp(-20, -10, -1)).toBe(-10);
    expect(clamp(0.5, 0, 1)).toBe(0.5);
  });

  it("should handle edge values", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
    expect(clamp(-0, -0, 0)).toBe(-0);
    expect(clamp(Infinity, 0, 10)).toBe(10);
    expect(clamp(-Infinity, 0, 10)).toBe(0);
    expect(clamp(5, 5, 5)).toBe(5);
    expect(clamp(-5, -5, -5)).toBe(-5);
  });
});
