import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  findLast,
} from "../../dist/index.js";

describe("findLast function", () => {
  it("should find last match using predicate", () => {
    const result = findLast([1, 2, 3, 4], value => value % 2 === 1);
    expect(result).toBe(3);
  });

  it("should respect fromIndex for arrays", () => {
    const result = findLast([1, 2, 3, 4], value => value % 2 === 0, 2);
    expect(result).toBe(2);
  });

  it("should work with object collections", () => {
    const result = findLast({ a: 1, b: 2, c: 3 }, value => value > 1);
    expect(result).toBe(3);
  });

  it("should return undefined when no match", () => {
    expect(findLast([1, 2, 3], value => value > 5)).toBeUndefined();
  });

  it("should handle nullish collection", () => {
    expect(findLast(null, () => true)).toBeUndefined();
    expect(findLast(undefined, () => true)).toBeUndefined();
  });
});
