import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  defaults,
} from "../../dist/index.js";

describe("defaults function", () => {
  it("assigns values for undefined properties", () => {
    const result = defaults({ a: 1, b: undefined }, { b: 2, c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("does not override defined values", () => {
    const result = defaults({ a: 1 }, { a: 2, b: 3 });
    expect(result).toEqual({ a: 1, b: 3 });
  });

  it("includes inherited source properties", () => {
    function Source() {
      this.a = 1;
    }
    Source.prototype.b = 2;

    const result = defaults({}, new Source());
    expect(result).toEqual({ a: 1, b: 2 });
  });
});
