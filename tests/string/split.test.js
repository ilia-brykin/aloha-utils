import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  split,
} from "../../dist/index.js";

describe("split function", () => {
  it("should split by string separator", () => {
    expect(split("a-b-c", "-", 2)).toEqual(["a", "b"]);
    expect(split("a-b-c", "-")).toEqual(["a", "b", "c"]);
  });

  it("should split by regex separator", () => {
    expect(split("a--b--c", /-+/)).toEqual(["a", "b", "c"]);
    expect(split("foo1bar2baz", /\d/)).toEqual(["foo", "bar", "baz"]);
  });

  it("should handle undefined separator", () => {
    expect(split("abc")).toEqual(["abc"]);
    expect(split("")).toEqual([""]);
  });

  it("should handle limit", () => {
    expect(split("a,b,c", ",", 1)).toEqual(["a"]);
    expect(split("a,b,c", ",", 0)).toEqual([]);
    expect(split("a,b,c", ",", -1)).toEqual([]);
    expect(split("a,b,c", ",", 2.9)).toEqual(["a", "b"]);
    expect(split("a,b,c", ",", "2")).toEqual(["a", "b"]);
    expect(split("a,b,c", ",", NaN)).toEqual([]);
    expect(split("a,b,c", ",", Infinity)).toEqual([]);
    expect(split("a,b,c", ",", -Infinity)).toEqual([]);
  });

  it("should handle non-string inputs via toString", () => {
    expect(split(12345, 2)).toEqual(["1", "345"]);
    expect(split(-0, "0")).toEqual(["-", ""]);
    expect(split([1, 2, 3], ",")).toEqual(["1", "2", "3"]);
    expect(split(Symbol("x"), "x")).toEqual(["Symbol(", ")"]);
  });

  it("should handle empty separator string", () => {
    expect(split("abc", "")).toEqual(["a", "b", "c"]);
    expect(split("abc", "", 2)).toEqual(["a", "b"]);
  });

  it("should handle unicode strings", () => {
    expect(split("Привет мир", " ")).toEqual(["Привет", "мир"]);
    expect(split("漢字-テスト", "-")).toEqual(["漢字", "テスト"]);
  });
});
