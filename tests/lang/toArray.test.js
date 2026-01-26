import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toArray,
} from "../../dist/index.js";

describe("toArray function", () => {
  it("should convert objects and strings", () => {
    expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
    expect(toArray("abc")).toEqual(["a", "b", "c"]);
  });

  it("should handle nil and non-iterable values", () => {
    expect(toArray(1)).toEqual([]);
    expect(toArray(null)).toEqual([]);
    expect(toArray(undefined)).toEqual([]);
    expect(toArray(NaN)).toEqual([]);
    expect(toArray(Symbol("x"))).toEqual([]);
    expect(toArray({})).toEqual([]);
  });

  it("should handle arrays and array-like values", () => {
    const arr = [1, 2];
    const arrayLike = { 0: "a", 1: "b", length: 2 };

    expect(toArray(arr)).toEqual([1, 2]);
    expect(toArray(arr)).not.toBe(arr);
    expect(toArray(arrayLike)).toEqual(["a", "b"]);
  });

  it("should handle iterables", () => {
    expect(toArray(new Set([1, 2]))).toEqual([1, 2]);
    expect(toArray(new Map([["a", 1], ["b", 2]]))).toEqual([["a", 1], ["b", 2]]);
    expect(toArray("")).toEqual([]);
    expect(toArray(new Uint8Array([1, 2, 3]))).toEqual([1, 2, 3]);
    expect(toArray(new Int16Array([-1, 2]))).toEqual([-1, 2]);
    expect(toArray(new Float32Array([1.5, 2.5]))).toEqual([1.5, 2.5]);
  });

  it("should handle array-like objects with gaps", () => {
    const sparse = { 0: "a", 2: "c", length: 3 };
    expect(toArray(sparse)).toEqual(["a", undefined, "c"]);
  });

  it("should handle objects with values", () => {
    expect(toArray({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3]);
  });
});
