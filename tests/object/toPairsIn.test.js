import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toPairsIn,
} from "../../dist/index.js";

describe("toPairsIn function", () => {
  it("returns own and inherited pairs", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    expect(toPairsIn(new Foo())).toEqual([["a", 1], ["b", 2], ["c", 3]]);
  });
});
