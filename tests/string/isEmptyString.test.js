import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isEmptyString,
} from "../../dist/index.js";

describe("isEmptyString function", () => {
  it("should return true for empty strings", () => {
    expect(isEmptyString("")).toBe(true);
  });

  it("should return false for non-empty or non-string values", () => {
    expect(isEmptyString(" ")).toBe(false);
    expect(isEmptyString("test")).toBe(false);
    expect(isEmptyString(new String(""))).toBe(false);
    expect(isEmptyString(0)).toBe(false);
    expect(isEmptyString(null)).toBe(false);
    expect(isEmptyString(undefined)).toBe(false);
    expect(isEmptyString([])).toBe(false);
    expect(isEmptyString({})).toBe(false);
    expect(isEmptyString(new Date())).toBe(false);
    expect(isEmptyString(/test/)).toBe(false);
    expect(isEmptyString(Symbol("x"))).toBe(false);
    expect(isEmptyString(1n)).toBe(false);
    expect(isEmptyString(new Map())).toBe(false);
    expect(isEmptyString(new Set())).toBe(false);
  });
});
