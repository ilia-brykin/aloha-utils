import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pick,
} from "../../dist/index.js";

describe("pick function", () => {
  it("picks specified paths", () => {
    const object = { a: 1, b: "2", c: 3 };
    expect(pick(object, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  it("picks deep paths", () => {
    const object = { a: { b: 2 }, c: 3 };
    expect(pick(object, "a.b")).toEqual({ a: { b: 2 } });
  });
});
