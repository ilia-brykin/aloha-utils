import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  inRange,
} from "../../dist/index.js";

describe("inRange function", () => {
  it("should return false for non-numbers", () => {
    expect(inRange("1", 0, 2)).toBe(false);
    expect(inRange(1, "0", 2)).toBe(false);
    expect(inRange(1, 0, "2")).toBe(false);
    expect(inRange(NaN, 0, 2)).toBe(false);
    expect(inRange(1, NaN, 2)).toBe(false);
    expect(inRange(1, 0, NaN)).toBe(false);
  });

  it("should check range as [start, end)", () => {
    expect(inRange(3, 2, 4)).toBe(true);
    expect(inRange(4, 2, 4)).toBe(false);
    expect(inRange(2, 2, 4)).toBe(true);
  });

  it("should support reversed ranges", () => {
    expect(inRange(3, 4, 2)).toBe(true);
    expect(inRange(4, 4, 2)).toBe(false);
  });

  it("should handle negative ranges", () => {
    expect(inRange(-3, -4, -2)).toBe(true);
    expect(inRange(-2, -4, -2)).toBe(false);
  });

  it("should handle fractional values", () => {
    expect(inRange(0.5, 0, 1)).toBe(true);
    expect(inRange(1, 0, 1)).toBe(false);
  });

  it("should handle infinities", () => {
    expect(inRange(5, -Infinity, Infinity)).toBe(true);
    expect(inRange(Infinity, -Infinity, Infinity)).toBe(false);
    expect(inRange(-Infinity, -Infinity, Infinity)).toBe(true);
  });
});
