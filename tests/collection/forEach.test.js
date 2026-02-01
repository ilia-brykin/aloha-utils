import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  forEach,
} from "../../dist/index.js";

describe("forEach function", () => {
  it("should iterate over array values", () => {
    const result = [];
    forEach([1, 2, 3], value => {
      result.push(value);
    });
    expect(result).toEqual([1, 2, 3]);
  });

  it("should allow early exit by returning false", () => {
    const result = [];
    forEach([1, 2, 3], value => {
      result.push(value);
      return value < 2;
    });
    expect(result).toEqual([1, 2]);
  });

  it("should iterate over object values", () => {
    const result = [];
    const collection = { a: 1, b: 2 };
    forEach(collection, (value, key) => {
      result.push(`${key}:${value}`);
    });
    expect(result).toEqual(["a:1", "b:2"]);
  });

  it("should return the collection", () => {
    const array = [1, 2];
    expect(forEach(array, () => undefined)).toBe(array);
  });

  it("should handle nullish collection", () => {
    expect(forEach(null, () => undefined)).toBeNull();
    expect(forEach(undefined, () => undefined)).toBeUndefined();
  });
});
