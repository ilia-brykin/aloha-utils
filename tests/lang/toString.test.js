import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toString,
} from "../../dist/index.js";

describe("toString function", () => {
  it("should return empty string for null and undefined", () => {
    expect(toString(null)).toBe("");
    expect(toString(undefined)).toBe("");
  });

  it("should convert booleans and numbers", () => {
    expect(toString(false)).toBe("false");
    expect(toString(true)).toBe("true");
    expect(toString(1)).toBe("1");
    expect(toString(-0)).toBe("-0");
    expect(toString(3.14)).toBe("3.14");
  });

  it("should convert objects and arrays", () => {
    expect(toString({ aloha: "hola" })).toBe("[object Object]");
    expect(toString(["sd", { dsf: 23 }, 123, [123, 543, 345]])).toBe(
      "sd,[object Object],123,123,543,345",
    );
    expect(toString([[[[1]]]])).toBe("1");
    expect(toString([["a", ["b"]], "c"])).toBe("a,b,c");
    expect(toString([null, undefined, "x"])).toBe(",,x");
  });

  it("should convert symbols", () => {
    expect(toString(Symbol("x"))).toBe("Symbol(x)");
  });

  it("should convert functions", () => {
    const fn = function example() {

    };
    expect(toString(fn)).toContain("function");
  });
});
