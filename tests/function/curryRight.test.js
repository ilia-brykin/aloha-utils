import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  curryRight,
} from "../../dist/index.js";

describe("curryRight function", () => {
  it("should curry arguments from right", () => {
    const curried = curryRight((a, b, c) => [a, b, c]);
    expect(curried(3)(2)(1)).toEqual([1, 2, 3]);
    expect(curried(2, 3)(1)).toEqual([1, 2, 3]);
    expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
  });

  it("should support placeholders", () => {
    const curried = curryRight((a, b, c) => [a, b, c]);
    expect(curried(3)(1, curryRight.placeholder)(2)).toEqual([1, 2, 3]);
  });
});
