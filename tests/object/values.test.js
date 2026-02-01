import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  values,
} from "../../dist/index.js";

describe("values function", () => {
  it("returns own enumerable values", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    expect(values(new Foo())).toEqual([1, 2]);
  });

  it("works with strings", () => {
    expect(values("hi")).toEqual(["h", "i"]);
  });
});
