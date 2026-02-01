import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  forOwnRight,
} from "../../dist/index.js";

describe("forOwnRight function", () => {
  it("iterates over own properties from right to left", () => {
    const object = { a: 1, b: 2, c: 3 };
    const keys = [];
    forOwnRight(object, (_value, key) => {
      keys.push(key);
    });
    expect(keys).toEqual(["c", "b", "a"]);
  });
});
