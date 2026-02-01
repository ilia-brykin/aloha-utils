import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  curry,
} from "../../dist/index.js";

describe("curry function", () => {
  it("should curry arguments", () => {
    const curried = curry((a, b, c) => [a, b, c]);
    expect(curried(1)(2)(3)).toEqual([1, 2, 3]);
    expect(curried(1, 2)(3)).toEqual([1, 2, 3]);
    expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
  });

  it("should support placeholders", () => {
    const curried = curry((a, b, c) => [a, b, c]);
    expect(curried(1)(curry.placeholder, 3)(2)).toEqual([1, 2, 3]);
  });
});
