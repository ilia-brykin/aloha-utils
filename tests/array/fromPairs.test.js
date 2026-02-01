import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  fromPairs,
} from "../../dist/index.js";

describe("fromPairs function", () => {
  it("should create object from pairs", () => {
    expect(fromPairs([["a", 1], ["b", 2]])).toEqual({ a: 1, b: 2 });
  });

  it("should override duplicate keys with last value", () => {
    expect(fromPairs([["a", 1], ["a", 2]])).toEqual({ a: 2 });
  });

  it("should support number keys", () => {
    expect(fromPairs([[1, "a"], [2, "b"]])).toEqual({ 1: "a", 2: "b" });
  });

  it("should support symbol keys", () => {
    const key = Symbol("key");
    const result = fromPairs([[key, 123]]);
    expect(result[key]).toBe(123);
  });

  it("should handle invalid pairs", () => {
    expect(fromPairs([["a", 1], ["b"], "c", null])).toEqual({ a: 1 });
  });

  it("should handle empty input", () => {
    expect(fromPairs([])).toEqual({});
  });

  it("should handle non-array input", () => {
    expect(fromPairs(null)).toEqual({});
    expect(fromPairs(undefined)).toEqual({});
    expect(fromPairs({ a: 1 })).toEqual({});
  });
});
