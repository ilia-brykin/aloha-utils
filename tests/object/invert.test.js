import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  invert,
} from "../../dist/index.js";

describe("invert function", () => {
  it("inverts keys and values", () => {
    expect(invert({ a: 1, b: 2, c: 1 })).toEqual({ "1": "c", "2": "b" });
  });

  it("coerces values to strings", () => {
    expect(invert({ a: true, b: null })).toEqual({ "true": "a", "null": "b" });
  });
});
