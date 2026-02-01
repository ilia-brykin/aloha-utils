import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  setWith,
} from "../../dist/index.js";

describe("setWith function", () => {
  it("creates path with customizer", () => {
    const object = {};
    setWith(object, "[0][1]", "a", Object);
    expect(object).toEqual({ "0": { "1": "a" } });
  });

  it("falls back to default path creation", () => {
    const object = {};
    setWith(object, "a[0].b", 2);
    expect(object).toEqual({ a: [{ b: 2 }] });
  });
});
