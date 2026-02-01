import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pullAllBy,
} from "../../dist/index.js";

describe("pullAllBy function", () => {
  it("should remove values using iteratee", () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
    pullAllBy(array, [{ x: 1 }, { x: 3 }], "x");
    expect(array).toEqual([{ x: 2 }]);
  });

  it("should handle function iteratee", () => {
    const array = [2.1, 1.2, 3.4];
    pullAllBy(array, [2.3, 3.9], Math.floor);
    expect(array).toEqual([1.2]);
  });

  it("should handle empty values", () => {
    const array = [1, 2, 3];
    pullAllBy(array, []);
    expect(array).toEqual([1, 2, 3]);
  });

  it("should handle non-array input", () => {
    expect(pullAllBy(null, [1], Math.floor)).toEqual(null);
    expect(pullAllBy(undefined, [1], Math.floor)).toEqual(undefined);
  });
});
