import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  uniqWith,
} from "../../dist/index.js";

describe("uniqWith function", () => {
  it("should remove duplicates using comparator", () => {
    const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 1, y: 2 }];
    const result = uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y);
    expect(result).toEqual([{ x: 1, y: 2 }, { x: 2, y: 1 }]);
  });

  it("should preserve order", () => {
    const objects = [{ x: 1 }, { x: 2 }, { x: 1 }];
    const result = uniqWith(objects, (a, b) => a.x === b.x);
    expect(result).toEqual([{ x: 1 }, { x: 2 }]);
  });

  it("should fallback to SameValueZero when comparator omitted", () => {
    expect(uniqWith([NaN, NaN, 1])).toEqual([NaN, 1]);
  });

  it("should handle empty array", () => {
    expect(uniqWith([], (a, b) => a === b)).toEqual([]);
  });

  it("should handle non-array input", () => {
    expect(uniqWith(null, (a, b) => a === b)).toEqual([]);
    expect(uniqWith(undefined, (a, b) => a === b)).toEqual([]);
    expect(uniqWith({ a: 1 }, (a, b) => a === b)).toEqual([]);
  });
});
