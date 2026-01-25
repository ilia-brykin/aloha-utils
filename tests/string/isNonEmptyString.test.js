import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isNonEmptyString,
} from "../../dist/index.js";

describe("isNonEmptyString function", () => {
  it("should return true for non-empty strings", () => {
    expect(isNonEmptyString(" ")).toBe(true);
    expect(isNonEmptyString("test")).toBe(true);
  });

  it("should return false for empty or non-string values", () => {
    expect(isNonEmptyString("")).toBe(false);
    expect(isNonEmptyString(new String(""))).toBe(false);
    expect(isNonEmptyString(0)).toBe(false);
    expect(isNonEmptyString(null)).toBe(false);
    expect(isNonEmptyString(undefined)).toBe(false);
    expect(isNonEmptyString([])).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
    expect(isNonEmptyString(new Date())).toBe(false);
    expect(isNonEmptyString(/test/)).toBe(false);
    expect(isNonEmptyString(Symbol("x"))).toBe(false);
    expect(isNonEmptyString(1n)).toBe(false);
    expect(isNonEmptyString(new Map())).toBe(false);
    expect(isNonEmptyString(new Set())).toBe(false);
  });
});
