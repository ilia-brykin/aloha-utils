import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  omitBy,
} from "../../dist/index.js";

describe("omitBy function", () => {
  it("omits properties that match predicate", () => {
    const object = { a: 1, b: "2", c: 3 };
    expect(omitBy(object, value => typeof value === "number")).toEqual({ b: "2" });
  });
});
