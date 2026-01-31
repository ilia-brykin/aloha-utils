import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  clone,
} from "../../dist/index.js";

describe("clone function", () => {
  it("should return primitives as-is", () => {
    const sym = Symbol("x");

    expect(clone(1)).toBe(1);
    expect(clone("abc")).toBe("abc");
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBeNull();
    expect(clone(undefined)).toBeUndefined();
    expect(clone(sym)).toBe(sym);
  });

  it("should shallow clone arrays", () => {
    const inner = { a: 1 };
    const arr = [inner, 2];
    const cloned = clone(arr);

    expect(cloned).not.toBe(arr);
    expect(cloned).toEqual([inner, 2]);
    expect(cloned[0]).toBe(inner);
  });

  it("should clone plain objects and preserve prototype", () => {
    const proto = { p: 1 };
    const obj = Object.create(proto);
    obj.a = 2;
    const sym = Symbol("k");
    obj[sym] = 3;

    const cloned = clone(obj);

    expect(cloned).not.toBe(obj);
    expect(Object.getPrototypeOf(cloned)).toBe(proto);
    expect(cloned.a).toBe(2);
    expect(cloned[sym]).toBe(3);
  });

  it("should clone objects with null prototype", () => {
    const obj = Object.create(null);
    obj.a = 1;

    const cloned = clone(obj);

    expect(Object.getPrototypeOf(cloned)).toBeNull();
    expect(cloned.a).toBe(1);
  });

  it("should not copy inherited properties", () => {
    const proto = { inherited: 1 };
    const obj = Object.create(proto);
    obj.own = 2;

    const cloned = clone(obj);

    expect(cloned.own).toBe(2);
    expect(Object.prototype.hasOwnProperty.call(cloned, "inherited")).toBe(false);
  });

  it("should clone arguments objects as plain objects", () => {
    const args = (function () {
      return arguments;
    })(1, 2);
    args.extra = 3;

    const cloned = clone(args);

    expect(cloned).toEqual({ 0: 1, 1: 2, extra: 3 });
    expect(Array.isArray(cloned)).toBe(false);
  });

  it("should clone Date objects", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const cloned = clone(date);

    expect(cloned).not.toBe(date);
    expect(cloned.getTime()).toBe(date.getTime());
  });

  it("should clone RegExp objects", () => {
    const re = /abc/gi;
    re.lastIndex = 2;
    const cloned = clone(re);

    expect(cloned).not.toBe(re);
    expect(cloned.source).toBe(re.source);
    expect(cloned.flags).toBe(re.flags);
    expect(cloned.lastIndex).toBe(2);
  });

  it("should clone Map and Set shallowly", () => {
    const value = { a: 1 };
    const map = new Map([["k", value]]);
    const set = new Set([value]);

    const clonedMap = clone(map);
    const clonedSet = clone(set);

    expect(clonedMap).not.toBe(map);
    expect(clonedMap.get("k")).toBe(value);
    expect(clonedSet).not.toBe(set);
    expect(clonedSet.has(value)).toBe(true);
  });

  it("should keep map keys and values shallow", () => {
    const key = { k: 1 };
    const value = { v: 2 };
    const map = new Map([[key, value]]);

    const cloned = clone(map);

    expect(cloned).not.toBe(map);
    expect(cloned.has(key)).toBe(true);
    expect(cloned.get(key)).toBe(value);
  });

  it("should clone ArrayBuffer by value", () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view[0] = 7;

    const cloned = clone(buffer);
    const clonedView = new Uint8Array(cloned);

    expect(cloned).not.toBe(buffer);
    expect(clonedView[0]).toBe(7);
    clonedView[0] = 9;
    expect(view[0]).toBe(7);
  });

  it("should clone DataView shallowly (shared buffer)", () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer, 2, 4);
    view.setUint8(0, 5);

    const cloned = clone(view);

    expect(cloned).not.toBe(view);
    expect(cloned.buffer).toBe(buffer);
    expect(cloned.byteOffset).toBe(2);
    expect(cloned.byteLength).toBe(4);
    expect(cloned.getUint8(0)).toBe(5);
  });

  it("should clone typed arrays with non-zero offset", () => {
    const buffer = new ArrayBuffer(8);
    const base = new Uint8Array(buffer);
    base.set([1, 2, 3, 4, 5, 6, 7, 8]);
    const view = new Uint8Array(buffer, 2, 3);

    const cloned = clone(view);

    expect(cloned).not.toBe(view);
    expect(cloned.buffer).toBe(buffer);
    expect(cloned.byteOffset).toBe(2);
    expect(cloned.byteLength).toBe(3);
    expect(Array.from(cloned)).toEqual([3, 4, 5]);
  });

  it("should clone typed arrays shallowly (shared buffer)", () => {
    const typed = new Uint8Array([1, 2, 3]);
    const cloned = clone(typed);

    expect(cloned).not.toBe(typed);
    expect(cloned.buffer).toBe(typed.buffer);
    expect(Array.from(cloned)).toEqual([1, 2, 3]);
  });

  it("should not copy non-enumerable properties", () => {
    const obj = {};
    Object.defineProperty(obj, "hidden", {
      value: 1,
      enumerable: false,
    });

    const cloned = clone(obj);

    expect(cloned.hidden).toBeUndefined();
  });

  it("should keep self references shallow", () => {
    const obj = { a: 1 };
    obj.self = obj;

    const cloned = clone(obj);

    expect(cloned).not.toBe(obj);
    expect(cloned.self).toBe(obj);
  });

  it("should clone boxed primitives", () => {
    const num = new Number(5);
    const str = new String("hi");
    const bool = new Boolean(false);

    const numClone = clone(num);
    const strClone = clone(str);
    const boolClone = clone(bool);

    expect(numClone).not.toBe(num);
    expect(strClone).not.toBe(str);
    expect(boolClone).not.toBe(bool);
    expect(numClone.valueOf()).toBe(5);
    expect(strClone.valueOf()).toBe("hi");
    expect(boolClone.valueOf()).toBe(false);
  });

  it("should clone symbol objects", () => {
    const symObj = Object(Symbol("s"));
    const cloned = clone(symObj);

    expect(cloned).not.toBe(symObj);
    expect(cloned.valueOf()).toBe(symObj.valueOf());
  });

  it("should not copy extra array properties", () => {
    const arr = [1, 2];
    arr.extra = 3;

    const cloned = clone(arr);

    expect(cloned).toEqual([1, 2]);
    expect(cloned.extra).toBeUndefined();
  });

  it("should return empty object for functions with properties", () => {
    const fn = () => {};
    fn.extra = 1;

    const cloned = clone(fn);

    expect(cloned).toEqual({});
  });

  it("should return empty object for Error with properties", () => {
    const err = new Error("x");
    err.extra = 1;

    const cloned = clone(err);

    expect(cloned).toEqual({});
  });

  it("should return empty object for uncloneable values", () => {
    const fn = () => {};
    const err = new Error("x");
    const weakMap = new WeakMap();
    const weakSet = new WeakSet();

    expect(clone(fn)).toEqual({});
    expect(clone(err)).toEqual({});
    expect(clone(weakMap)).toEqual({});
    expect(clone(weakSet)).toEqual({});
  });
});
