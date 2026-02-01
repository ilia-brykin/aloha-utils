import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  uniqBy,
} from "../../dist/index.js";

describe("uniqBy function", () => {
  it("should remove duplicates by iteratee", () => {
    expect(uniqBy([2.1, 1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });

  it("should support property iteratee shorthand", () => {
    const result = uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], "x");
    expect(result).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it("should preserve order", () => {
    const result = uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], "x");
    expect(result).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it("should handle empty array", () => {
    expect(uniqBy([], Math.floor)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(uniqBy(null, Math.floor)).toEqual([]);
    expect(uniqBy(undefined, Math.floor)).toEqual([]);
    expect(uniqBy({ a: 1 }, Math.floor)).toEqual([]);
  });
});
