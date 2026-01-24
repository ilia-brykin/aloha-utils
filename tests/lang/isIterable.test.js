import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isIterable,
} from "../../dist/index.js";

describe("isIterable function", () => {
  it("should return true for iterables", () => {
    expect(isIterable([1, 2])).toBe(true);
    expect(isIterable("test")).toBe(true);
    expect(isIterable(new Uint8Array(2))).toBe(true);
    expect(isIterable(new Map([["a", 1]]))).toBe(true);
    expect(isIterable(new Map())).toBe(true);
    expect(isIterable(new Set())).toBe(true);
    expect(isIterable(new Set([1, 2]))).toBe(true);
  });

  it("should return false for non-iterables", () => {
    expect(isIterable({})).toBe(false);
    expect(isIterable({ [Symbol.iterator]: 123 })).toBe(false);
    expect(isIterable({ [Symbol.iterator]: () => {} })).toBe(true);
    expect(isIterable(0)).toBe(false);
    expect(isIterable(null)).toBe(false);
    expect(isIterable(undefined)).toBe(false);
  });
});
