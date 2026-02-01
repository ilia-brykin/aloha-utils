import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  overArgs,
} from "../../dist/index.js";

describe("overArgs function", () => {
  it("should transform arguments", () => {
    const doubled = n => n * 2;
    const square = n => n * n;
    const func = overArgs((x, y) => [x, y], [square, doubled]);
    expect(func(9, 3)).toEqual([81, 6]);
  });
});
