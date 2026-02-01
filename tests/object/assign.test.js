import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  assign,
} from "../../dist/index.js";

describe("assign function", () => {
  it("assigns own enumerable properties from sources", () => {
    function Foo() {
      this.a = 1;
    }
    function Bar() {
      this.c = 3;
    }

    Foo.prototype.b = 2;
    Bar.prototype.d = 4;

    expect(assign({ a: 0 }, new Foo(), new Bar())).toEqual({ a: 1, c: 3 });
  });

  it("overwrites earlier assignments", () => {
    const target = { a: 1 };
    const result = assign(target, { a: 2 }, { a: 3, b: 4 });
    expect(result).toBe(target);
    expect(result).toEqual({ a: 3, b: 4 });
  });

  it("skips nullish sources", () => {
    const result = assign({ a: 1 }, null, undefined, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it("coerces null or undefined target", () => {
    expect(assign(null, { a: 1 })).toEqual({ a: 1 });
    expect(assign(undefined, { a: 2 })).toEqual({ a: 2 });
  });
});
