import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isFalsyNonZero,
} from "../../dist/index.js";

describe("isFalsyNonZero function", () => {
  it("should return true for falsy non-zero values", () => {
    expect(isFalsyNonZero(false)).toBe(true);
    expect(isFalsyNonZero("")).toBe(true);
    expect(isFalsyNonZero(null)).toBe(true);
    expect(isFalsyNonZero(undefined)).toBe(true);
    expect(isFalsyNonZero(NaN)).toBe(true);
    expect(isFalsyNonZero(0n)).toBe(true);
  });

  it("should return false for 0 and -0", () => {
    expect(isFalsyNonZero(0)).toBe(false);
    expect(isFalsyNonZero(-0)).toBe(false);
  });

  it("should return false for truthy values", () => {
    const fn = function example() {

    };
    const arrow = () => {};
    class Example {

    }

    expect(isFalsyNonZero(1)).toBe(false);
    expect(isFalsyNonZero(-1)).toBe(false);
    expect(isFalsyNonZero("a")).toBe(false);
    expect(isFalsyNonZero(" ")).toBe(false);
    expect(isFalsyNonZero([])).toBe(false);
    expect(isFalsyNonZero({})).toBe(false);
    expect(isFalsyNonZero(fn)).toBe(false);
    expect(isFalsyNonZero(arrow)).toBe(false);
    expect(isFalsyNonZero(Example)).toBe(false);
    expect(isFalsyNonZero(new Date())).toBe(false);
    expect(isFalsyNonZero(/test/)).toBe(false);
    expect(isFalsyNonZero(Symbol("x"))).toBe(false);
  });
});
