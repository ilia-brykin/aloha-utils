import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isNative,
} from "../../dist/index.js";

describe("isNative function", () => {
  it("should return true for native functions", () => {
    expect(isNative(Array.prototype.push)).toBe(true);
    expect(isNative(Math.max)).toBe(true);
    expect(isNative(Date)).toBe(true);
    expect(isNative(Object.prototype.toString)).toBe(true);
    expect(isNative(String.prototype.trim)).toBe(true);
    expect(isNative(Number.isFinite)).toBe(true);
    expect(isNative(Array.isArray)).toBe(true);
    expect(isNative(Object.keys)).toBe(true);
    expect(isNative(JSON.stringify)).toBe(true);
    expect(isNative(Promise.resolve)).toBe(true);
    expect(isNative(Map)).toBe(true);
    expect(isNative(Set)).toBe(true);
  });

  it("should return false for non-native functions", () => {
    const fn = function example() {

    };
    const arrow = () => {};
    class Example {

    }

    expect(isNative(fn)).toBe(false);
    expect(isNative(arrow)).toBe(false);
    expect(isNative(Example)).toBe(false);
  });

  it("should return false for non-function values", () => {
    expect(isNative({})).toBe(false);
    expect(isNative([])).toBe(false);
    expect(isNative("test")).toBe(false);
    expect(isNative(null)).toBe(false);
    expect(isNative(undefined)).toBe(false);
  });
});
