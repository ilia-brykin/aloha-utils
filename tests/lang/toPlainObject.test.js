import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toPlainObject,
} from "../../dist/index.js";

describe("toPlainObject function", () => {
  it("should flatten inherited enumerable properties", () => {
    function Foo() {
      this.b = 2;
    }

    Foo.prototype.c = 3;

    expect(toPlainObject(new Foo())).toEqual({ b: 2, c: 3 });
  });

  it("should ignore non-enumerable inherited properties", () => {
    function Bar() {
      this.a = 1;
    }

    Object.defineProperty(Bar.prototype, "hidden", {
      value: 9,
      enumerable: false,
    });

    expect(toPlainObject(new Bar())).toEqual({ a: 1 });
  });

  it("should include enumerable inherited from Object.create", () => {
    const base = { a: 1 };
    const obj = Object.create(base);
    obj.b = 2;

    expect(toPlainObject(obj)).toEqual({ b: 2, a: 1 });
  });

  it("should handle plain objects and arrays", () => {
    expect(toPlainObject({ a: 1 })).toEqual({ a: 1 });
    expect(toPlainObject([1, 2])).toEqual({ 0: 1, 1: 2 });
  });

  it("should handle strings and array-like values", () => {
    expect(toPlainObject("abc")).toEqual({ 0: "a", 1: "b", 2: "c" });
  });

  it("should handle objects with overwritten keys", () => {
    function Baz() {
      this.a = 2;
    }

    Baz.prototype.a = 1;
    Baz.prototype.b = 3;

    expect(toPlainObject(new Baz())).toEqual({ a: 2, b: 3 });
  });

  it("should handle sparse arrays", () => {
    const arr = [];
    arr[2] = "c";

    expect(toPlainObject(arr)).toEqual({ 2: "c" });
  });

  it("should handle typed arrays", () => {
    expect(toPlainObject(new Uint8Array([1, 2]))).toEqual({ 0: 1, 1: 2 });
    expect(toPlainObject(new Int16Array([-1, 2]))).toEqual({ 0: -1, 1: 2 });
  });

  it("should handle Date, Map, Set, and Error", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const map = new Map([["a", 1]]);
    const set = new Set([1, 2]);
    const err = new Error("oops");

    date.custom = "x";
    map.extra = 1;
    set.extra = 2;
    err.code = "E_OOPS";

    expect(toPlainObject(date)).toEqual({ custom: "x" });
    expect(toPlainObject(map)).toEqual({ extra: 1 });
    expect(toPlainObject(set)).toEqual({ extra: 2 });
    expect(toPlainObject(err)).toEqual({ code: "E_OOPS" });
  });

  it("should handle functions with properties", () => {
    const fn = () => {};
    fn.a = 1;

    expect(toPlainObject(fn)).toEqual({ a: 1 });
  });

  it("should handle symbols as values", () => {
    const sym = Symbol("x");
    const obj = { a: sym };
    expect(toPlainObject(obj)).toEqual({ a: sym });
  });

  it("should ignore symbol keys", () => {
    const sym = Symbol("x");
    const obj = { a: 1, [sym]: 2 };
    expect(toPlainObject(obj)).toEqual({ a: 1 });
  });

  it("should handle nil and non-object values", () => {
    expect(toPlainObject(null)).toEqual({});
    expect(toPlainObject(undefined)).toEqual({});
    expect(toPlainObject(1)).toEqual({});
    expect(toPlainObject(true)).toEqual({});
    expect(toPlainObject(NaN)).toEqual({});
    expect(toPlainObject(Symbol("x"))).toEqual({});
  });
});
