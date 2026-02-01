import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  forIn,
} from "../../dist/index.js";

describe("forIn function", () => {
  it("iterates over own and inherited properties", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
    }
    Foo.prototype.c = 3;

    const result = [];
    forIn(new Foo(), (value, key) => {
      result.push([key, value]);
    });

    expect(result).toEqual([["a", 1], ["b", 2], ["c", 3]]);
  });

  it("can exit early by returning false", () => {
    const object = Object.create({ c: 3 });
    object.a = 1;
    object.b = 2;

    const keys = [];
    forIn(object, (value, key) => {
      keys.push(key);
      if (key === "b") {
        return false;
      }
    });

    expect(keys).toEqual(["a", "b"]);
  });
});
