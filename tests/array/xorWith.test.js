import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  xorWith,
} from "../../dist/index.js";

describe("xorWith function", () => {
  it("should return symmetric difference using comparator", () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
    const others = [{ x: 1, y: 1 }, { x: 1, y: 2 }];
    const result = xorWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
    expect(result).toEqual([{ x: 2, y: 1 }, { x: 1, y: 1 }]);
  });

  it("should fallback to SameValueZero when comparator omitted", () => {
    expect(xorWith([NaN, 1], [NaN, 2])).toEqual([1, 2]);
  });

  it("should handle empty arrays", () => {
    expect(xorWith([], [1, 2], (a, b) => a === b)).toEqual([1, 2]);
    expect(xorWith([1, 2], [], (a, b) => a === b)).toEqual([1, 2]);
  });

  it("should handle no arrays", () => {
    expect(xorWith()).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(xorWith([1, 2], null, (a, b) => a === b)).toEqual([]);
    expect(xorWith(null, [1, 2], (a, b) => a === b)).toEqual([]);
  });
});
