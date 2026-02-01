import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  size,
} from "../../dist/index.js";

describe("size function", () => {
  it("should return length for arrays", () => {
    expect(size([1, 2, 3])).toBe(3);
  });

  it("should return length for strings", () => {
    expect(size("pebbles")).toBe(7);
  });

  it("should return number of keys for objects", () => {
    expect(size({ a: 1, b: 2 })).toBe(2);
  });

  it("should handle nullish collection", () => {
    expect(size(null)).toBe(0);
    expect(size(undefined)).toBe(0);
  });
});
