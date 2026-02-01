import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  merge,
} from "../../dist/index.js";

describe("merge function", () => {
  it("recursively merges objects and arrays", () => {
    const object = { a: [{ b: 2 }, { d: 4 }] };
    const other = { a: [{ c: 3 }, { e: 5 }] };
    expect(merge(object, other)).toEqual({
      a: [{ b: 2, c: 3 }, { d: 4, e: 5 }],
    });
  });

  it("overwrites non-mergeable values", () => {
    const object = { a: { b: 1 } };
    const other = { a: 2 };
    expect(merge(object, other)).toEqual({ a: 2 });
  });

  it("skips undefined source values when destination exists", () => {
    const object = { a: 1 };
    const other = { a: undefined };
    expect(merge(object, other)).toEqual({ a: 1 });
  });
});
