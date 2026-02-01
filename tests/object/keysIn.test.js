import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  keysIn,
} from "../../dist/index.js";

describe("keysIn function", () => {
  it("returns own and inherited enumerable keys", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    expect(keysIn(new Foo())).toEqual(["a", "b", "c"]);
  });
});
