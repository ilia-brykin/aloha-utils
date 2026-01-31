import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  set,
} from "../../dist/index.js";

describe("set function", () => {
  it("should set nested values by string path", () => {
    const object = { a: [{ b: { c: 3 } }] };
    const result = set(object, "a[0].b.c", 4);

    expect(result).toBe(object);
    expect(object.a[0].b.c).toBe(4);
  });

  it("should set nested values by array path", () => {
    const object = {};
    set(object, ["x", "0", "y", "z"], 5);

    expect(Array.isArray(object.x)).toBe(true);
    expect(object.x[0].y.z).toBe(5);
  });

  it("should create arrays for index keys and objects for others", () => {
    const object = {};
    set(object, "a[0].b.c", 1);

    expect(Array.isArray(object.a)).toBe(true);
    expect(object.a[0].b.c).toBe(1);
  });

  it("should overwrite non-object intermediates", () => {
    const object = { a: 1 };
    set(object, "a.b.c", 2);

    expect(object.a.b.c).toBe(2);
  });

  it("should handle array roots and bracket-first paths", () => {
    const object = [];
    set(object, "[0].a", 1);

    expect(object[0].a).toBe(1);
  });

  it("should handle quoted keys in brackets", () => {
    const object = {};
    set(object, "a['b.c']", 1);
    set(object, "a[\"d e\"]", 2);

    expect(object.a["b.c"]).toBe(1);
    expect(object.a["d e"]).toBe(2);
  });

  it("should not throw on invalid paths", () => {
    const object = {};
    expect(() => set(object, "a[", 1)).not.toThrow();
    expect(() => set(object, "a..b", 2)).not.toThrow();
  });

  it("should set negative indexes as object keys", () => {
    const object = [];
    set(object, "[-1].a", 9);

    expect(object["-1"].a).toBe(9);
  });

  it("should avoid prototype pollution keys", () => {
    const object = {};
    set(object, "__proto__.polluted", "yes");
    set(object, "constructor.prototype.polluted", "yes");

    expect(({}).polluted).toBeUndefined();
    expect(object.polluted).toBeUndefined();
  });

  it("should return input when object is null or undefined", () => {
    expect(set(null, "a.b", 1)).toBeNull();
    expect(set(undefined, "a.b", 1)).toBeUndefined();
  });

  it("should handle empty path", () => {
    const object = { a: 1 };
    const result = set(object, "", 2);

    expect(result).toBe(object);
    expect(object).toEqual({ a: 1 });
  });

  it("should support deep mixed structures (6+ levels)", () => {
    const object = {};
    set(object, "a[0].b[1].c.d[2].e.f", 10);

    expect(object.a[0].b[1].c.d[2].e.f).toBe(10);
  });

  it("should support deep arrays of objects with multiple branches", () => {
    const object = {};
    set(object, "a[0].b[0].c", 1);
    set(object, "a[0].b[1].c", 2);
    set(object, "a[1].b[0].c", 3);

    expect(object.a[0].b[0].c).toBe(1);
    expect(object.a[0].b[1].c).toBe(2);
    expect(object.a[1].b[0].c).toBe(3);
  });

  it("should keep arrays sparse when setting far index", () => {
    const object = {};
    set(object, "a[3].b", 5);

    expect(Array.isArray(object.a)).toBe(true);
    expect(object.a.length).toBe(4);
    expect(object.a[3].b).toBe(5);
    expect(object.a[0]).toBeUndefined();
  });

  it("should treat numeric string keys as array indexes", () => {
    const object = {};
    set(object, ["a", "1", "b"], 7);

    expect(Array.isArray(object.a)).toBe(true);
    expect(object.a[1].b).toBe(7);
  });

  it("should treat non-integer numeric-like keys as object keys", () => {
    const object = {};
    set(object, "a[1.5].b", 1);

    expect(Array.isArray(object.a)).toBe(false);
    expect(object.a["1.5"].b).toBe(1);
  });

  it("should not overwrite existing object/array containers", () => {
    const object = { a: { b: [{ c: 1 }] } };
    set(object, "a.b[0].c", 2);

    expect(object.a.b[0].c).toBe(2);
  });

  it("should replace non-container next value when deeper path needed", () => {
    const object = { a: { b: 1 } };
    set(object, "a.b[0].c", 3);

    expect(Array.isArray(object.a.b)).toBe(true);
    expect(object.a.b[0].c).toBe(3);
  });

  it("should handle quoted keys with escaped quotes and backslashes", () => {
    const object = {};
    set(object, "a[\"b\\\"c\"].d", 1);
    set(object, "a['e\\'f'].g", 2);
    set(object, "a[\"h\\\\i\"].j", 3);

    expect(object.a["b\"c"].d).toBe(1);
    expect(object.a["e'f"].g).toBe(2);
    expect(object.a["h\\i"].j).toBe(3);
  });

  it("should handle unicode keys", () => {
    const object = {};
    set(object, "a.ключ", 7);
    set(object, "a['漢字']", 8);

    expect(object.a["ключ"]).toBe(7);
    expect(object.a["漢字"]).toBe(8);
  });

  it("should handle keys containing dots and brackets", () => {
    const object = {};
    set(object, "a['x[y]']", 1);
    set(object, "a['p]q']", 2);
    set(object, "a['r[s']", 3);
    set(object, "a['t.u']", 4);

    expect(object.a["x[y]"]).toBe(1);
    expect(object.a["p]q"]).toBe(2);
    expect(object.a["r[s"]).toBe(3);
    expect(object.a["t.u"]).toBe(4);
  });

  it("should handle inherited properties as set targets", () => {
    function Foo() {}
    Foo.prototype.a = { b: 1 };
    const object = new Foo();

    set(object, "a.b", 2);
    expect(object.a.b).toBe(2);
  });

  it("should handle access on function objects", () => {
    function fn() {}
    set(fn, "meta.info.value", 9);

    expect(fn.meta.info.value).toBe(9);
  });

  it("should return input when root is a primitive", () => {
    const str = "abc";
    const num = 123;
    const bool = true;

    expect(set(str, "0", "x")).toBe(str);
    expect(set(num, "a.b", 1)).toBe(num);
    expect(set(bool, "a", 1)).toBe(bool);
  });

  it("should not create containers after unsafe key appears", () => {
    const object = {};
    set(object, "safe.__proto__.polluted", "yes");
    set(object, "safe.constructor.prototype.polluted", "yes");

    expect(object.safe).toEqual({});
    expect(({}).polluted).toBeUndefined();
  });

  it("should handle array roots with deep indexes", () => {
    const object = [];
    set(object, "[0][1][2].a", 1);

    expect(Array.isArray(object[0])).toBe(true);
    expect(Array.isArray(object[0][1])).toBe(true);
    expect(object[0][1][2].a).toBe(1);
  });

  it("should handle mixed dot/bracket paths across branches", () => {
    const object = {};
    set(object, "a[0].b.c[1].d", 1);
    set(object, "a[0].b.c[0].d", 2);
    set(object, "a[1].b.c[0].d", 3);

    expect(object.a[0].b.c[1].d).toBe(1);
    expect(object.a[0].b.c[0].d).toBe(2);
    expect(object.a[1].b.c[0].d).toBe(3);
  });

  it("should tolerate malformed paths without throwing", () => {
    const object = {};
    expect(() => set(object, ".", 1)).not.toThrow();
    expect(() => set(object, "a.", 1)).not.toThrow();
    expect(() => set(object, ".a", 1)).not.toThrow();
    expect(() => set(object, "a..b", 1)).not.toThrow();
    expect(() => set(object, "a[]", 1)).not.toThrow();
    expect(() => set(object, "a['b'", 1)).not.toThrow();
    expect(() => set(object, "a[\"b\"", 1)).not.toThrow();
    expect(() => set(object, "a['b']c", 1)).not.toThrow();
    expect(() => set(object, "a]", 1)).not.toThrow();
    expect(() => set(object, "a[0", 1)).not.toThrow();
    expect(() => set(object, "a[ 0]", 1)).not.toThrow();
  });
});
