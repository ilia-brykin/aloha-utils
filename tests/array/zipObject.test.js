import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  zipObject,
} from "../../dist/index.js";

describe("zipObject function", () => {
  it("should map props to values", () => {
    expect(zipObject(["a", "b"], [1, 2])).toEqual({ a: 1, b: 2 });
  });

  it("should handle missing values", () => {
    expect(zipObject(["a", "b"], [1])).toEqual({ a: 1, b: undefined });
  });

  it("should handle empty props", () => {
    expect(zipObject([], [1, 2])).toEqual({});
  });

  it("should handle non-array props", () => {
    expect(zipObject(null, [1])).toEqual({});
    expect(zipObject(undefined, [1])).toEqual({});
    expect(zipObject({ a: 1 }, [1])).toEqual({});
  });
});
