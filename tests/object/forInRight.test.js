import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  forInRight,
} from "../../dist/index.js";

describe("forInRight function", () => {
  it("iterates over properties from right to left", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    const keys = [];
    forInRight(new Foo(), (_value, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(["c", "b", "a"]);
  });
});
