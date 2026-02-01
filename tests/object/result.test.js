import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  result,
} from "../../dist/index.js";

describe("result function", () => {
  it("returns value at path", () => {
    const object = { a: [{ b: { c1: 3 } }] };
    expect(result(object, "a[0].b.c1")).toBe(3);
  });

  it("invokes function values with parent context", () => {
    const object = { a: { b: { c2: function() { return this.value; }, value: 4 } } };
    expect(result(object, "a.b.c2")).toBe(4);
  });

  it("uses default value when missing", () => {
    const object = { a: { b: 2 } };
    expect(result(object, "a.c", "default")).toBe("default");
  });

  it("invokes default value when it's a function", () => {
    const object = { a: { b: 2 } };
    expect(result(object, "a.c", () => "default")).toBe("default");
  });
});
