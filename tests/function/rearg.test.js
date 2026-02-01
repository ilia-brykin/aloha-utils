import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  rearg,
} from "../../dist/index.js";

describe("rearg function", () => {
  it("should reorder arguments", () => {
    const fn = rearg((a, b, c) => [a, b, c], [2, 0, 1]);
    expect(fn("b", "c", "a")).toEqual(["a", "b", "c"]);
  });
});
