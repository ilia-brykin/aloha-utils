import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isBuffer,
} from "../../dist/index.js";

describe("isBuffer function", () => {
  it("should return true for Buffer instances", () => {
    if (typeof Buffer === "undefined" || typeof Buffer.isBuffer !== "function") {
      expect(isBuffer("x")).toBe(false);
      return;
    }

    expect(isBuffer(Buffer.from("hello"))).toBe(true);
    expect(isBuffer(Buffer.alloc(0))).toBe(true);
    expect(isBuffer(new Buffer(2))).toBe(true);
  });

  it("should return false for non-Buffer types", () => {
    const fn = function example() {

    };
    const arrow = () => {};
    class Example {

    }

    expect(isBuffer(0)).toBe(false);
    expect(isBuffer(NaN)).toBe(false);
    expect(isBuffer(true)).toBe(false);
    expect(isBuffer(false)).toBe(false);
    expect(isBuffer("")).toBe(false);
    expect(isBuffer(null)).toBe(false);
    expect(isBuffer(undefined)).toBe(false);
    expect(isBuffer([])).toBe(false);
    expect(isBuffer({})).toBe(false);
    expect(isBuffer(fn)).toBe(false);
    expect(isBuffer(arrow)).toBe(false);
    expect(isBuffer(Example)).toBe(false);
    expect(isBuffer(new Date())).toBe(false);
    expect(isBuffer(/test/)).toBe(false);
    expect(isBuffer(Symbol("x"))).toBe(false);
    expect(isBuffer(1n)).toBe(false);
    expect(isBuffer(new Map())).toBe(false);
    expect(isBuffer(new Set())).toBe(false);
    expect(isBuffer(new Uint8Array(4))).toBe(false);
    expect(isBuffer(new ArrayBuffer(8))).toBe(false);
  });
});
