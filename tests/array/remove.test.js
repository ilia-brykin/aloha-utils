import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  remove,
} from "../../dist/index.js";

describe("remove function", () => {
  it("should remove elements matching predicate", () => {
    const array = [1, 2, 3, 4];
    const evens = remove(array, n => n % 2 === 0);
    expect(array).toEqual([1, 3]);
    expect(evens).toEqual([2, 4]);
  });

  it("should support matches shorthand", () => {
    const array = [{ a: 1 }, { a: 2 }, { a: 1 }];
    const removed = remove(array, { a: 1 });
    expect(removed).toEqual([{ a: 1 }, { a: 1 }]);
    expect(array).toEqual([{ a: 2 }]);
  });

  it("should support matchesProperty shorthand", () => {
    const array = [{ a: 1 }, { a: 2 }, { a: 1 }];
    const removed = remove(array, ["a", 1]);
    expect(removed).toEqual([{ a: 1 }, { a: 1 }]);
    expect(array).toEqual([{ a: 2 }]);
  });

  it("should support property shorthand", () => {
    const array = [{ active: false }, { active: true }, { active: true }];
    const removed = remove(array, "active");
    expect(removed).toEqual([{ active: true }, { active: true }]);
    expect(array).toEqual([{ active: false }]);
  });

  it("should use identity when predicate omitted", () => {
    const array = [0, 1, 2, 0, 3];
    const removed = remove(array);
    expect(removed).toEqual([1, 2, 3]);
    expect(array).toEqual([0, 0]);
  });

  it("should handle empty array", () => {
    const array = [];
    const removed = remove(array, value => value);
    expect(removed).toEqual([]);
    expect(array).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(remove(null, value => value)).toEqual([]);
    expect(remove(undefined, value => value)).toEqual([]);
    expect(remove({ a: 1 }, value => value)).toEqual([]);
  });
});
