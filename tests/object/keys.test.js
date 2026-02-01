import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  keys,
} from "../../dist/index.js";

describe("keys function", () => {
  it("returns own enumerable keys", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    expect(keys(new Foo())).toEqual(["a", "b"]);
  });

  it("works with strings", () => {
    expect(keys("hi")).toEqual(["0", "1"]);
  });
});
