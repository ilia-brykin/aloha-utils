import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  omit,
} from "../../dist/index.js";

describe("omit function", () => {
  it("omits specified paths", () => {
    const object = { a: 1, b: "2", c: 3 };
    expect(omit(object, ["a", "c"])).toEqual({ b: "2" });
  });

  it("omits deep paths", () => {
    const object = { a: { b: 2 }, c: 3 };
    expect(omit(object, "a.b")).toEqual({ a: {}, c: 3 });
  });
});
