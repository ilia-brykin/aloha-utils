import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  cloneDeep,
} from "../../dist/index.js";

describe("cloneDeep function", () => {
  it("should return primitives as-is", () => {
    const sym = Symbol("x");

    expect(cloneDeep(1)).toBe(1);
    expect(cloneDeep("abc")).toBe("abc");
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBeNull();
    expect(cloneDeep(undefined)).toBeUndefined();
    expect(cloneDeep(sym)).toBe(sym);
  });

  it("should deep clone arrays", () => {
    const inner = { a: 1 };
    const arr = [inner, { b: 2 }];
    const cloned = cloneDeep(arr);

    expect(cloned).not.toBe(arr);
    expect(cloned[0]).not.toBe(inner);
    expect(cloned[0]).toEqual({ a: 1 });
    expect(cloned[1]).toEqual({ b: 2 });
  });

  it("should preserve shared references in arrays", () => {
    const shared = { a: 1 };
    const arr = [shared, shared];

    const cloned = cloneDeep(arr);

    expect(cloned[0]).toBe(cloned[1]);
    expect(cloned[0]).not.toBe(shared);
  });

  it("should deep clone nested objects", () => {
    const obj = { a: { b: { c: 3 } } };
    const cloned = cloneDeep(obj);

    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a.b).not.toBe(obj.a.b);
    expect(cloned).toEqual(obj);
  });

  it("should preserve prototype and deep clone own props", () => {
    const proto = { p: 1 };
    const obj = Object.create(proto);
    obj.a = { b: 2 };
    const sym = Symbol("k");
    obj[sym] = { c: 3 };

    const cloned = cloneDeep(obj);

    expect(Object.getPrototypeOf(cloned)).toBe(proto);
    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a).toEqual({ b: 2 });
    expect(cloned[sym]).not.toBe(obj[sym]);
    expect(cloned[sym]).toEqual({ c: 3 });
  });

  it("should clone objects with null prototype", () => {
    const obj = Object.create(null);
    obj.a = { b: 1 };

    const cloned = cloneDeep(obj);

    expect(Object.getPrototypeOf(cloned)).toBeNull();
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a).toEqual({ b: 1 });
  });

  it("should not copy inherited properties", () => {
    const proto = { inherited: 1 };
    const obj = Object.create(proto);
    obj.own = { v: 2 };

    const cloned = cloneDeep(obj);

    expect(cloned.own).toEqual({ v: 2 });
    expect(Object.prototype.hasOwnProperty.call(cloned, "inherited")).toBe(false);
  });

  it("should clone arguments objects as plain objects", () => {
    const args = (function () {
      return arguments;
    })({ a: 1 }, 2);
    args.extra = { b: 3 };

    const cloned = cloneDeep(args);

    expect(cloned).toEqual({ 0: { a: 1 }, 1: 2, extra: { b: 3 } });
    expect(cloned[0]).not.toBe(args[0]);
    expect(Array.isArray(cloned)).toBe(false);
  });

  it("should not copy extra array properties", () => {
    const arr = [1, 2];
    arr.extra = { a: 1 };

    const cloned = cloneDeep(arr);

    expect(cloned).toEqual([1, 2]);
    expect(cloned.extra).toBeUndefined();
  });

  it("should clone Date objects", () => {
    const date = new Date("2020-01-01T00:00:00.000Z");
    const cloned = cloneDeep(date);

    expect(cloned).not.toBe(date);
    expect(cloned.getTime()).toBe(date.getTime());
  });

  it("should clone RegExp objects", () => {
    const re = /abc/gi;
    re.lastIndex = 2;
    const cloned = cloneDeep(re);

    expect(cloned).not.toBe(re);
    expect(cloned.source).toBe(re.source);
    expect(cloned.flags).toBe(re.flags);
    expect(cloned.lastIndex).toBe(2);
  });

  it("should deep clone Map values and keep keys", () => {
    const key = { k: 1 };
    const value = { v: 2 };
    const map = new Map([[key, value]]);

    const cloned = cloneDeep(map);

    expect(cloned).not.toBe(map);
    expect(cloned.has(key)).toBe(true);
    expect(cloned.get(key)).not.toBe(value);
    expect(cloned.get(key)).toEqual({ v: 2 });
  });

  it("should preserve shared map values", () => {
    const shared = { a: 1 };
    const map = new Map([
      ["x", shared],
      ["y", shared],
    ]);

    const cloned = cloneDeep(map);

    expect(cloned.get("x")).toBe(cloned.get("y"));
    expect(cloned.get("x")).not.toBe(shared);
  });

  it("should deep clone Set values", () => {
    const value = { a: 1 };
    const set = new Set([value]);

    const cloned = cloneDeep(set);
    const clonedValue = Array.from(cloned)[0];

    expect(cloned).not.toBe(set);
    expect(clonedValue).not.toBe(value);
    expect(clonedValue).toEqual({ a: 1 });
  });

  it("should clone ArrayBuffer by value", () => {
    const buffer = new ArrayBuffer(4);
    const view = new Uint8Array(buffer);
    view[0] = 7;

    const cloned = cloneDeep(buffer);
    const clonedView = new Uint8Array(cloned);

    expect(cloned).not.toBe(buffer);
    expect(clonedView[0]).toBe(7);
    clonedView[0] = 9;
    expect(view[0]).toBe(7);
  });

  it("should clone DataView deeply (new buffer)", () => {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer, 2, 4);
    view.setUint8(0, 5);

    const cloned = cloneDeep(view);

    expect(cloned).not.toBe(view);
    expect(cloned.buffer).not.toBe(buffer);
    expect(cloned.byteOffset).toBe(2);
    expect(cloned.byteLength).toBe(4);
    expect(cloned.getUint8(0)).toBe(5);
  });

  it("should clone typed arrays deeply (new buffer)", () => {
    const typed = new Uint8Array([1, 2, 3]);
    const cloned = cloneDeep(typed);

    expect(cloned).not.toBe(typed);
    expect(cloned.buffer).not.toBe(typed.buffer);
    expect(Array.from(cloned)).toEqual([1, 2, 3]);
  });

  it("should clone bigint typed arrays when available", () => {
    if (typeof BigInt64Array === "undefined") {
      return;
    }

    const typed = new BigInt64Array([1n, 2n, 3n]);
    const cloned = cloneDeep(typed);

    expect(cloned).not.toBe(typed);
    expect(cloned.buffer).not.toBe(typed.buffer);
    expect(Array.from(cloned)).toEqual([1n, 2n, 3n]);
  });

  it("should clone typed arrays with non-zero offset", () => {
    const buffer = new ArrayBuffer(8);
    const base = new Uint8Array(buffer);
    base.set([1, 2, 3, 4, 5, 6, 7, 8]);
    const view = new Uint8Array(buffer, 2, 3);

    const cloned = cloneDeep(view);

    expect(cloned).not.toBe(view);
    expect(cloned.buffer).not.toBe(buffer);
    expect(cloned.byteOffset).toBe(2);
    expect(cloned.byteLength).toBe(3);
    expect(Array.from(cloned)).toEqual([3, 4, 5]);
  });

  it("should clone boxed primitives", () => {
    const num = new Number(5);
    const str = new String("hi");
    const bool = new Boolean(false);

    const numClone = cloneDeep(num);
    const strClone = cloneDeep(str);
    const boolClone = cloneDeep(bool);

    expect(numClone).not.toBe(num);
    expect(strClone).not.toBe(str);
    expect(boolClone).not.toBe(bool);
    expect(numClone.valueOf()).toBe(5);
    expect(strClone.valueOf()).toBe("hi");
    expect(boolClone.valueOf()).toBe(false);
  });

  it("should clone symbol objects", () => {
    const symObj = Object(Symbol("s"));
    const cloned = cloneDeep(symObj);

    expect(cloned).not.toBe(symObj);
    expect(cloned.valueOf()).toBe(symObj.valueOf());
  });

  it("should not copy non-enumerable properties", () => {
    const obj = {};
    Object.defineProperty(obj, "hidden", {
      value: { a: 1 },
      enumerable: false,
    });

    const cloned = cloneDeep(obj);

    expect(cloned.hidden).toBeUndefined();
  });

  it("should deep clone objects containing functions as values", () => {
    const obj = { a: () => {}, b: { c: () => {} } };
    const cloned = cloneDeep(obj);

    expect(cloned).toEqual({ a: {}, b: { c: {} } });
  });

  it("should preserve circular references", () => {
    const obj = { a: 1 };
    obj.self = obj;

    const cloned = cloneDeep(obj);

    expect(cloned).not.toBe(obj);
    expect(cloned.self).toBe(cloned);
  });

  it("should preserve circular references in arrays", () => {
    const arr = [];
    arr.push(arr);

    const cloned = cloneDeep(arr);

    expect(cloned).not.toBe(arr);
    expect(cloned[0]).toBe(cloned);
  });

  it("should return empty object for uncloneable values", () => {
    const fn = () => {};
    const err = new Error("x");
    const weakMap = new WeakMap();
    const weakSet = new WeakSet();

    expect(cloneDeep(fn)).toEqual({});
    expect(cloneDeep(err)).toEqual({});
    expect(cloneDeep(weakMap)).toEqual({});
    expect(cloneDeep(weakSet)).toEqual({});
  });
});
