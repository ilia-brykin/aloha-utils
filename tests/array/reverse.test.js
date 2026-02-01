import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  reverse,
} from "../../dist/index.js";

describe("reverse function", () => {
  it("should reverse array in place", () => {
    const array = [1, 2, 3];
    const result = reverse(array);
    expect(result).toEqual([3, 2, 1]);
    expect(result).toBe(array);
  });

  it("should handle empty array", () => {
    const array = [];
    const result = reverse(array);
    expect(result).toEqual([]);
    expect(result).toBe(array);
  });

  it("should handle non-array input", () => {
    expect(reverse(null)).toBeNull();
    expect(reverse(undefined)).toBeUndefined();
    expect(reverse({ a: 1 })).toEqual({ a: 1 });
  });
});
