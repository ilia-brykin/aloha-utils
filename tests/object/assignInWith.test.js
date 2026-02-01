import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  assignInWith,
} from "../../dist/index.js";

describe("assignInWith function", () => {
  it("assigns own and inherited properties with customizer", () => {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    const customizer = (objValue, srcValue) => (
      objValue === undefined ? srcValue : objValue
    );

    const result = assignInWith({ a: 9 }, new Foo(), customizer);
    expect(result).toEqual({ a: 9, b: 2 });
  });

  it("falls back to source when customizer returns undefined", () => {
    const customizer = () => undefined;
    const result = assignInWith({ a: 1 }, { a: 2, b: 3 }, customizer);
    expect(result).toEqual({ a: 2, b: 3 });
  });
});
