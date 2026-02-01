import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sample,
} from "../../dist/index.js";

describe("sample function", () => {
  it("should return element from array", () => {
    const array = [1, 2, 3, 4];
    const value = sample(array);
    expect(array).toContain(value);
  });

  it("should return element from object", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const value = sample(obj);
    expect([1, 2, 3]).toContain(value);
  });

  it("should return undefined for empty collection", () => {
    expect(sample([])).toBeUndefined();
  });
});
