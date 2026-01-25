import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isFalsyNonEmptyString,
} from "../../dist/index.js";

describe("isFalsyNonEmptyString function", () => {
  it("should return true for falsy values except empty string", () => {
    expect(isFalsyNonEmptyString(false)).toBe(true);
    expect(isFalsyNonEmptyString(null)).toBe(true);
    expect(isFalsyNonEmptyString(undefined)).toBe(true);
    expect(isFalsyNonEmptyString(0)).toBe(true);
    expect(isFalsyNonEmptyString(-0)).toBe(true);
    expect(isFalsyNonEmptyString(NaN)).toBe(true);
    expect(isFalsyNonEmptyString(0n)).toBe(true);
  });

  it("should return false for empty string", () => {
    expect(isFalsyNonEmptyString("")).toBe(false);
  });

  it("should return false for truthy values", () => {
    const fn = function example() {

    };
    const arrow = () => {};
    class Example {

    }

    expect(isFalsyNonEmptyString(" ")).toBe(false);
    expect(isFalsyNonEmptyString("a")).toBe(false);
    expect(isFalsyNonEmptyString(1)).toBe(false);
    expect(isFalsyNonEmptyString(-1)).toBe(false);
    expect(isFalsyNonEmptyString([])).toBe(false);
    expect(isFalsyNonEmptyString({})).toBe(false);
    expect(isFalsyNonEmptyString(fn)).toBe(false);
    expect(isFalsyNonEmptyString(arrow)).toBe(false);
    expect(isFalsyNonEmptyString(Example)).toBe(false);
    expect(isFalsyNonEmptyString(new Date())).toBe(false);
    expect(isFalsyNonEmptyString(/test/)).toBe(false);
    expect(isFalsyNonEmptyString(Symbol("x"))).toBe(false);
  });
});
