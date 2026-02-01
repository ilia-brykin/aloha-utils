import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  update,
} from "../../dist/index.js";

describe("update function", () => {
  it("updates value at path using updater", () => {
    const object = { a: [{ b: { c: 3 } }] };
    update(object, "a[0].b.c", n => n * n);
    expect(object.a[0].b.c).toBe(9);
  });

  it("creates missing paths via set", () => {
    const object = {};
    update(object, "x[0].y.z", n => (n ? n + 1 : 0));
    expect(object).toEqual({ x: [{ y: { z: 0 } }] });
  });
});
