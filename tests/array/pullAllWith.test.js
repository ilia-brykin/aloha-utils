import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pullAllWith,
} from "../../dist/index.js";

describe("pullAllWith function", () => {
  it("should remove values using comparator", () => {
    const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
    pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => a.x === b.x && a.y === b.y);
    expect(array).toEqual([{ x: 1, y: 2 }, { x: 5, y: 6 }]);
  });

  it("should fallback to SameValueZero when no comparator", () => {
    const array = [NaN, 0, -0, 1];
    pullAllWith(array, [NaN, -0]);
    expect(array).toEqual([1]);
  });

  it("should handle empty values", () => {
    const array = [1, 2, 3];
    pullAllWith(array, []);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle non-array input", () => {
    expect(pullAllWith(null, [1], (a, b) => a === b)).toEqual(null);
    expect(pullAllWith(undefined, [1], (a, b) => a === b)).toEqual(undefined);
  });
});
