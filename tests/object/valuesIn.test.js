import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  valuesIn,
} from "../../dist/index.js";

describe("valuesIn function", () => {
  it("returns own and inherited values", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    expect(valuesIn(new Foo())).toEqual([1, 2, 3]);
  });
});
