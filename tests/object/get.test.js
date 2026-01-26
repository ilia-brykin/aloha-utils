import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  get,
} from "../../dist/index.js";

describe("get function", () => {
  it("should get nested values by string path", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, "a[0].b.c")).toBe(3);
  });

  it("should get nested values by array path", () => {
    const object = { a: [{ b: { c: 3 } }] };
    expect(get(object, ["a", "0", "b", "c"])).toBe(3);
    expect(get(object, ["a", 0, "b", "c"])).toBe(3);
  });

  it("should return default when value is undefined", () => {
    const object = { a: { b: 1 } };
    expect(get(object, "a.c", "default")).toBe("default");
  });

  it("should return default when existing value is undefined", () => {
    const object = { a: { b: undefined } };
    expect(get(object, "a.b", "default")).toBe("default");
  });

  it("should not use default when value is null", () => {
    const object = { a: { b: null } };
    expect(get(object, "a.b", "default")).toBe(null);
  });

  it("should return default when object is null or undefined", () => {
    expect(get(null, "a", "default")).toBe("default");
    expect(get(undefined, "a", "default")).toBe("default");
  });

  it("should handle array roots and bracket-first paths", () => {
    const object = [{ a: 1 }];
    expect(get(object, "[0].a")).toBe(1);
    expect(get(object, "0.a")).toBe(1);
  });

  it("should handle quoted keys in brackets", () => {
    const object = { a: { "b.c": 5, "d e": 6 } };
    expect(get(object, "a['b.c']")).toBe(5);
    expect(get(object, "a[\"d e\"]")).toBe(6);
  });

  it("should handle quoted keys with escaped quotes and backslashes", () => {
    const object = {
      a: {
        "b\"c": 1,
        "d'e": 2,
        "f\\g": 3,
      },
    };

    expect(get(object, "a[\"b\\\"c\"]")).toBe(1);
    expect(get(object, "a['d\\'e']")).toBe(2);
    expect(get(object, "a[\"f\\\\g\"]")).toBe(3);
  });

  it("should handle unicode keys", () => {
    const object = { a: { "ключ": 7, "漢字": 8 } };
    expect(get(object, "a.ключ")).toBe(7);
    expect(get(object, "a['漢字']")).toBe(8);
  });

  it("should handle keys with umlauts", () => {
    const object = { a: { "über": 1, "München": 2, "äöü": 3 } };
    expect(get(object, "a.über")).toBe(1);
    expect(get(object, "a['München']")).toBe(2);
    expect(get(object, "a['äöü']")).toBe(3);
  });

  it("should handle keys containing brackets and dots", () => {
    const object = { a: { "x[y]": 1, "p]q": 2, "r[s": 3, "t.u": 4 } };
    expect(get(object, "a['x[y]']")).toBe(1);
    expect(get(object, "a['p]q']")).toBe(2);
    expect(get(object, "a['r[s']")).toBe(3);
    expect(get(object, "a['t.u']")).toBe(4);
  });

  it("should not throw on invalid paths", () => {
    const object = { a: { b: 1 }, "a[0]": { b: 2 } };

    expect(() => get(object, ".", "default")).not.toThrow();
    expect(() => get(object, "a.", "default")).not.toThrow();
    expect(() => get(object, ".a", "default")).not.toThrow();
    expect(() => get(object, "a..b", "default")).not.toThrow();
    expect(() => get(object, "a[", "default")).not.toThrow();
    expect(() => get(object, "a[]", "default")).not.toThrow();
    expect(() => get(object, "a['b'", "default")).not.toThrow();
    expect(() => get(object, "a[\"b\"", "default")).not.toThrow();
    expect(() => get(object, "a['b']c", "default")).not.toThrow();
    expect(() => get(object, "a]", "default")).not.toThrow();
    expect(() => get(object, "a[0", "default")).not.toThrow();
    expect(() => get(object, "a[ 0]", "default")).not.toThrow();
  });

  it("should handle bracketed numeric and string indexes", () => {
    const object = { a: ["x", "y"] };
    expect(get(object, "a[0]")).toBe("x");
    expect(get(object, "a['1']")).toBe("y");
  });

  it("should handle keys containing brackets", () => {
    const object = { "a[0]": { b: 2 } };
    expect(get(object, "['a[0]'].b")).toBe(2);
  });

  it("should handle inherited enumerable properties", () => {
    function Foo() {
      this.a = 1;
    }

    Foo.prototype.b = 2;

    const object = new Foo();
    expect(get(object, "b")).toBe(2);
  });

  it("should handle non-enumerable and getter properties", () => {
    const object = {};
    Object.defineProperty(object, "hidden", {
      value: 7,
      enumerable: false,
    });
    Object.defineProperty(object, "computed", {
      get() {
        return 9;
      },
      enumerable: false,
    });

    expect(get(object, "hidden")).toBe(7);
    expect(get(object, "computed")).toBe(9);
  });

  it("should handle array properties like length", () => {
    const object = { a: [1, 2, 3] };
    expect(get(object, "a.length")).toBe(3);
  });

  it("should handle empty path", () => {
    const object = { a: 1 };
    expect(get(object, "")).toEqual(object);
  });

  it("should handle empty path with default", () => {
    const object = { a: 1 };
    expect(get(object, "", "default")).toEqual(object);
  });

  it("should handle non-object roots", () => {
    expect(get("abc", "0")).toBe("a");
    expect(get(123, "a", "default")).toBe("default");
  });

  it("should handle access on function objects", () => {
    function fn() {}
    fn.value = { deep: 10 };
    expect(get(fn, "value.deep")).toBe(10);
    expect(get(fn, "name")).toBe("fn");
  });

  it("should handle negative indexes as string keys", () => {
    const arr = [1, 2];
    arr["-1"] = 9;
    expect(get(arr, "[-1]")).toBe(9);
  });

  it("should handle Object.create(null) and __proto__ key", () => {
    const obj = Object.create(null);
    obj["__proto__"] = 4;
    obj.a = { b: 5 };

    expect(get(obj, "__proto__")).toBe(4);
    expect(get(obj, "a.b")).toBe(5);
  });

  it("should handle deep arrays and objects (4+ levels)", () => {
    const data = {
      a: [
        {
          b: [
            {
              c: {
                d: [0, { e: 5 }],
              },
            },
          ],
        },
      ],
    };

    expect(get(data, "a[0].b[0].c.d[1].e")).toBe(5);
    expect(get(data, ["a", 0, "b", 0, "c", "d", 1, "e"])).toBe(5);
    expect(get(data, "a[0].b[0].c.d[0]")).toBe(0);
    expect(get(data, "a[0].b[0].c.d[2]", "fallback")).toBe("fallback");
  });

  it("should handle nested arrays of objects", () => {
    const data = [[[{ x: [{ y: [{ z: 7 }] }] }]]];

    expect(get(data, "[0][0][0].x[0].y[0].z")).toBe(7);
    expect(get(data, ["0", 0, 0, "x", 0, "y", 0, "z"])).toBe(7);
    expect(get(data, "0.0.0.x.0.y.0.z")).toBe(7);
  });

  it("should handle mixed structures with multiple gets", () => {
    const data = {
      a: [
        {
          b: {
            c: [{ d: 1 }, { d: 2 }],
          },
        },
      ],
      x: {
        y: [
          { z: [{ w: 3 }] },
          { z: [{ w: 4 }] },
        ],
      },
    };

    expect(get(data, "a[0].b.c[0].d")).toBe(1);
    expect(get(data, "a[0].b.c[1].d")).toBe(2);
    expect(get(data, "x.y[0].z[0].w")).toBe(3);
    expect(get(data, "x.y[1].z[0].w")).toBe(4);
  });

  it("should handle other object types with deep paths", () => {
    const obj = {
      date: new Date("2020-01-01T00:00:00.000Z"),
      map: new Map([["k", { v: 9 }]]),
      set: new Set([{ a: 1 }]),
    };

    obj.date.meta = { info: { value: 10 } };
    obj.map.extra = { deep: { value: 11 } };
    obj.set.extra = [{ deep: { value: 12 } }];

    expect(get(obj, "date.meta.info.value")).toBe(10);
    expect(get(obj, "map.extra.deep.value")).toBe(11);
    expect(get(obj, "set.extra[0].deep.value")).toBe(12);
  });

  it("should handle deep paths on primitive wrappers", () => {
    const data = {
      str: new String("abc"),
      num: new Number(10),
      bool: new Boolean(false),
    };

    data.str.extra = { deep: 1 };
    data.num.extra = { deep: 2 };
    data.bool.extra = { deep: 3 };

    expect(get(data, "str.extra.deep")).toBe(1);
    expect(get(data, "num.extra.deep")).toBe(2);
    expect(get(data, "bool.extra.deep")).toBe(3);
  });
});
