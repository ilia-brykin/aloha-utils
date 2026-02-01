import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  assignWith,
} from "../../dist/index.js";

describe("assignWith function", () => {
  it("uses customizer to control assignment", () => {
    const customizer = (objValue, srcValue) => (
      objValue === undefined ? srcValue : objValue
    );

    const result = assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("falls back to source when customizer returns undefined", () => {
    const customizer = () => undefined;
    const result = assignWith({ a: 1 }, { a: 2, b: 3 }, customizer);
    expect(result).toEqual({ a: 2, b: 3 });
  });

  it("treats non-function customizer as a source", () => {
    const result = assignWith({ a: 1 }, { a: 2, b: 3 }, "nope");
    expect(result).toEqual({
      a: 2,
      b: 3,
      0: "n",
      1: "o",
      2: "p",
      3: "e",
    });
  });

  it("coerces null target", () => {
    const result = assignWith(null, { a: 1 });
    expect(result).toEqual({ a: 1 });
  });
});
