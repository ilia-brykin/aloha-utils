import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  words,
} from "../../dist/index.js";

describe("words function", () => {
  it("should split into words by default", () => {
    expect(words("fred, barney, & pebbles")).toEqual(["fred", "barney", "pebbles"]);
    expect(words("fooBar")).toEqual(["foo", "Bar"]);
    expect(words("__FOO_BAR__")).toEqual(["FOO", "BAR"]);
    expect(words("fooBAR")).toEqual(["foo", "BAR"]);
    expect(words("foo2bar")).toEqual(["foo2bar"]);
    expect(words("FOO2BAR")).toEqual(["FOO2", "BAR"]);
  });

  it("should split using custom regex pattern", () => {
    expect(words("fred, barney, & pebbles", /[^, ]+/g)).toEqual(["fred", "barney", "&", "pebbles"]);
    expect(words("a1b2c3", /\d/g)).toEqual(["1", "2", "3"]);
    expect(words("a1b2c3", /\w/g)).toEqual(["a", "1", "b", "2", "c", "3"]);
  });

  it("should return empty array for empty string", () => {
    expect(words("")).toEqual([]);
    expect(words("   ")).toEqual([]);
    expect(words("---___...")).toEqual([]);
  });

  it("should handle non-string inputs via toString", () => {
    expect(words(12345)).toEqual(["12345"]);
    expect(words(-0)).toEqual(["0"]);
    expect(words([1, 2, 3])).toEqual(["1", "2", "3"]);
    expect(words(null)).toEqual([]);
    expect(words(undefined)).toEqual([]);
  });

  it("should handle unicode words", () => {
    expect(words("Привет мир")).toEqual(["Привет", "мир"]);
    expect(words("München ist schön")).toEqual(["München", "ist", "schön"]);
    expect(words("漢字 テスト")).toEqual(["漢字", "テスト"]);
    expect(words("тест123")).toEqual(["тест123"]);
  });

  it("should handle empty pattern", () => {
    expect(words("abc", "")).toEqual([]);
  });

  it("should handle regex without global flag", () => {
    expect(words("a,b,c", /[^, ]+/)).toEqual(["a", "b", "c"]);
  });
});
