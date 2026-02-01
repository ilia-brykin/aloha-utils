import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  assignIn,
} from "../../dist/index.js";

describe("assignIn function", () => {
  it("assigns own and inherited enumerable properties", () => {
    function Foo() {
      this.a = 1;
    }
    function Bar() {
      this.c = 3;
    }

    Foo.prototype.b = 2;
    Bar.prototype.d = 4;

    expect(assignIn({ a: 0 }, new Foo(), new Bar())).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });

  it("overwrites earlier assignments", () => {
    const target = { a: 1 };
    const result = assignIn(target, { a: 2 }, { a: 3, b: 4 });
    expect(result).toBe(target);
    expect(result).toEqual({ a: 3, b: 4 });
  });

  it("skips nullish sources", () => {
    const result = assignIn({ a: 1 }, null, undefined, { b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });
});
