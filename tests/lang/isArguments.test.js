import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isArguments,
} from "../../dist/index.js";

describe("isArguments function", () => {
  it("should return true for arguments objects", () => {
    const args = (function example() {
      return arguments;
    }("a", "b"));

    expect(isArguments(args)).toBe(true);
  });

  it("should return false for non-arguments values", () => {
    const fn = function example() {

    };
    const arrow = () => {};
    class Example {

    }

    expect(isArguments(Infinity)).toBe(false);
    expect(isArguments(-Infinity)).toBe(false);
    expect(isArguments(fn)).toBe(false);
    expect(isArguments(arrow)).toBe(false);
    expect(isArguments(Example)).toBe(false);
    expect(isArguments(new Date())).toBe(false);
    expect(isArguments(/test/)).toBe(false);
    expect(isArguments(Symbol("x"))).toBe(false);
    expect(isArguments(1n)).toBe(false);
    expect(isArguments(new Map())).toBe(false);
    expect(isArguments(new Set())).toBe(false);
    expect(isArguments([])).toBe(false);
    expect(isArguments({})).toBe(false);
    expect(isArguments("test")).toBe(false);
    expect(isArguments(null)).toBe(false);
    expect(isArguments(undefined)).toBe(false);
  });
});
