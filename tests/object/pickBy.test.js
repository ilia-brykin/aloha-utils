import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pickBy,
} from "../../dist/index.js";

describe("pickBy function", () => {
  it("picks properties that match predicate", () => {
    const object = { a: 1, b: "2", c: 3 };
    expect(pickBy(object, value => typeof value === "number")).toEqual({ a: 1, c: 3 });
  });
});
