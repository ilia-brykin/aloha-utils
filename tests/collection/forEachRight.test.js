import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  forEachRight,
} from "../../dist/index.js";

describe("forEachRight function", () => {
  it("should iterate over array values from right to left", () => {
    const result = [];
    forEachRight([1, 2, 3], value => {
      result.push(value);
    });
    expect(result).toEqual([3, 2, 1]);
  });

  it("should allow early exit by returning false", () => {
    const result = [];
    forEachRight([1, 2, 3], value => {
      result.push(value);
      return value > 2;
    });
    expect(result).toEqual([3, 2]);
  });

  it("should iterate over object values from right to left", () => {
    const result = [];
    const collection = { a: 1, b: 2, c: 3 };
    forEachRight(collection, (value, key) => {
      result.push(`${key}:${value}`);
    });
    expect(result).toEqual(["c:3", "b:2", "a:1"]);
  });

  it("should return the collection", () => {
    const array = [1, 2];
    expect(forEachRight(array, () => undefined)).toBe(array);
  });

  it("should handle nullish collection", () => {
    expect(forEachRight(null, () => undefined)).toBeNull();
    expect(forEachRight(undefined, () => undefined)).toBeUndefined();
  });
});
