import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  transform,
} from "../../dist/index.js";

describe("transform function", () => {
  it("transforms arrays", () => {
    const result = transform([2, 3, 4], (acc, n) => {
      acc.push(n * n);
      return n % 2 === 0;
    }, []);
    expect(result).toEqual([4, 9]);
  });

  it("transforms objects", () => {
    const result = transform({ a: 1, b: 2, c: 1 }, (acc, value, key) => {
      if (!acc[value]) {
        acc[value] = [];
      }
      acc[value].push(key);
    }, {});
    expect(result).toEqual({ 1: ["a", "c"], 2: ["b"] });
  });
});
