import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  castArray,
} from "../../dist/index.js";

describe("castArray function", () => {
  it("should return empty array when no arguments are provided", () => {
    expect(castArray()).toEqual([]);
  });

  it("should return the same array reference", () => {
    const arr = [1, 2, 3];
    expect(castArray(arr)).toBe(arr);
  });

  it("should wrap primitive values", () => {
    const sym = Symbol("x");

    expect(castArray(1)).toEqual([1]);
    expect(castArray("abc")).toEqual(["abc"]);
    expect(castArray(true)).toEqual([true]);
    expect(castArray(sym)).toEqual([sym]);
  });

  it("should wrap null and undefined", () => {
    expect(castArray(null)).toEqual([null]);
    expect(castArray(undefined)).toEqual([undefined]);
  });

  it("should wrap objects without converting them", () => {
    const obj = { a: 1 };
    expect(castArray(obj)).toEqual([obj]);
  });

  it("should treat array-like values as single items", () => {
    const arrayLike = { 0: "a", 1: "b", length: 2 };
    expect(castArray(arrayLike)).toEqual([arrayLike]);
  });

  it("should treat iterable values as single items", () => {
    const set = new Set([1, 2]);
    const map = new Map([["a", 1]]);
    const typed = new Uint8Array([1, 2]);

    expect(castArray(set)).toEqual([set]);
    expect(castArray(map)).toEqual([map]);
    expect(castArray(typed)).toEqual([typed]);
  });

  it("should handle function and date objects", () => {
    function fn() {}
    const date = new Date("2020-01-01T00:00:00.000Z");

    expect(castArray(fn)).toEqual([fn]);
    expect(castArray(date)).toEqual([date]);
  });

  it("should not flatten nested arrays", () => {
    const nested = [[1], [2]];
    expect(castArray(nested)).toBe(nested);
  });
});
