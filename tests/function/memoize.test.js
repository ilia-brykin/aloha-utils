import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  memoize,
} from "../../dist/index.js";

describe("memoize function", () => {
  it("should memoize results by first argument", () => {
    const fn = memoize(value => value * 2);
    expect(fn(2)).toBe(4);
    expect(fn(2)).toBe(4);
  });

  it("should support resolver", () => {
    const fn = memoize((a, b) => a + b, (a, b) => `${a}:${b}`);
    expect(fn(1, 2)).toBe(3);
    expect(fn(1, 2)).toBe(3);
  });

  it("should expose cache", () => {
    const fn = memoize(obj => Object.keys(obj));
    const obj = { a: 1 };
    fn(obj);
    fn.cache.set(obj, ["x"]);
    expect(fn(obj)).toEqual(["x"]);
  });
});
