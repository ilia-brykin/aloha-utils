import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  flip,
} from "../../dist/index.js";

describe("flip function", () => {
  it("should reverse arguments", () => {
    const fn = flip((a, b, c) => [a, b, c]);
    expect(fn("a", "b", "c")).toEqual(["c", "b", "a"]);
  });
});
