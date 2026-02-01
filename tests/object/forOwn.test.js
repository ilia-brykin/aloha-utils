import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  forOwn,
} from "../../dist/index.js";

describe("forOwn function", () => {
  it("iterates over own properties only", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    const keys = [];
    forOwn(new Foo(), (_value, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(["a", "b"]);
  });

  it("can exit early by returning false", () => {
    const object = { a: 1, b: 2, c: 3 };
    const keys = [];
    forOwn(object, (_value, key) => {
      keys.push(key);
      return key !== "b";
    });
    expect(keys).toEqual(["a", "b"]);
  });
});
