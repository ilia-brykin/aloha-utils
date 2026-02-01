import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  ary,
} from "../../dist/index.js";

describe("ary function", () => {
  it("should cap arguments", () => {
    const fn = ary((a, b, c) => [a, b, c], 2);
    expect(fn(1, 2, 3)).toEqual([1, 2, undefined]);
  });

  it("should default to func.length", () => {
    const fn = ary((a, b) => [a, b]);
    expect(fn(1, 2, 3)).toEqual([1, 2]);
  });
});
