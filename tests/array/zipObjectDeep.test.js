import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  zipObjectDeep,
} from "../../dist/index.js";

describe("zipObjectDeep function", () => {
  it("should support deep property paths", () => {
    const result = zipObjectDeep(["a.b[0].c", "a.b[1].d"], [1, 2]);
    expect(result).toEqual({ a: { b: [{ c: 1 }, { d: 2 }] } });
  });

  it("should support array path entries", () => {
    const result = zipObjectDeep([["a", "b", 0, "c"]], [3]);
    expect(result).toEqual({ a: { b: [{ c: 3 }] } });
  });

  it("should handle missing values", () => {
    const result = zipObjectDeep(["a.b", "c"], [1]);
    expect(result).toEqual({ a: { b: 1 }, c: undefined });
  });

  it("should handle empty props", () => {
    expect(zipObjectDeep([], [1, 2])).toEqual({});
  });

  it("should handle non-array props", () => {
    expect(zipObjectDeep(null, [1])).toEqual({});
    expect(zipObjectDeep(undefined, [1])).toEqual({});
    expect(zipObjectDeep({ a: 1 }, [1])).toEqual({});
  });
});
