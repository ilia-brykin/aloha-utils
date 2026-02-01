import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  unary,
} from "../../dist/index.js";

describe("unary function", () => {
  it("should cap to one argument", () => {
    const fn = unary((a, b) => [a, b]);
    expect(fn(1, 2)).toEqual([1, undefined]);
  });
});
