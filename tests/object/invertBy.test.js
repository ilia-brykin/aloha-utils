import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  invertBy,
} from "../../dist/index.js";

describe("invertBy function", () => {
  it("groups keys by value", () => {
    expect(invertBy({ a: 1, b: 2, c: 1 })).toEqual({
      "1": ["a", "c"],
      "2": ["b"],
    });
  });

  it("uses iteratee to compute inverted keys", () => {
    const result = invertBy({ a: 1, b: 2, c: 1 }, value => `group${value}`);
    expect(result).toEqual({
      group1: ["a", "c"],
      group2: ["b"],
    });
  });
});
