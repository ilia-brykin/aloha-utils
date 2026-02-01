import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toPairs,
} from "../../dist/index.js";

describe("toPairs function", () => {
  it("returns own enumerable pairs", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;
    expect(toPairs(new Foo())).toEqual([["a", 1], ["b", 2]]);
  });

  it("supports Map and Set", () => {
    const map = new Map([["a", 1]]);
    const set = new Set([1, 2]);
    expect(toPairs(map)).toEqual([["a", 1]]);
    expect(toPairs(set)).toEqual([[1, 1], [2, 2]]);
  });
});
