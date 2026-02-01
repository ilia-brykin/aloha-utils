import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  invoke,
} from "../../dist/index.js";

describe("invoke function", () => {
  it("invokes method at path", () => {
    const object = { a: [{ b: { c: [1, 2, 3, 4] } }] };
    expect(invoke(object, "a[0].b.c.slice", 1, 3)).toEqual([2, 3]);
  });

  it("returns undefined for missing path", () => {
    const object = { a: { b: 2 } };
    expect(invoke(object, "a.c")).toBeUndefined();
  });
});
