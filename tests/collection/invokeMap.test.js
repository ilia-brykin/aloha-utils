import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  invokeMap,
} from "../../dist/index.js";

describe("invokeMap function", () => {
  it("should invoke method by path", () => {
    const result = invokeMap([[5, 1, 7], [3, 2, 1]], "sort");
    expect(result).toEqual([[1, 5, 7], [1, 2, 3]]);
  });

  it("should invoke function with this binding", () => {
    const result = invokeMap([123, 456], String.prototype.split, "");
    expect(result).toEqual([["1", "2", "3"], ["4", "5", "6"]]);
  });

  it("should return undefined for missing methods", () => {
    const result = invokeMap([{ a: 1 }], "missing");
    expect(result).toEqual([undefined]);
  });

  it("should handle nullish collection", () => {
    expect(invokeMap(null, "toString")).toEqual([]);
    expect(invokeMap(undefined, "toString")).toEqual([]);
  });
});
