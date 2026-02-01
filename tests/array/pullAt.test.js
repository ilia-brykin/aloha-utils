import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  pullAt,
} from "../../dist/index.js";

describe("pullAt function", () => {
  it("should remove elements at indexes", () => {
    const array = ["a", "b", "c", "d"];
    const pulled = pullAt(array, [1, 3]);
    expect(array).toEqual(["a", "c"]);
    expect(pulled).toEqual(["b", "d"]);
  });

  it("should support multiple index arguments", () => {
    const array = ["a", "b", "c", "d"];
    const pulled = pullAt(array, 0, 2);
    expect(array).toEqual(["b", "d"]);
    expect(pulled).toEqual(["a", "c"]);
  });

  it("should handle duplicate indexes", () => {
    const array = ["a", "b", "c"];
    const pulled = pullAt(array, [1, 1, 2]);
    expect(array).toEqual(["a"]);
    expect(pulled).toEqual(["b", "b", "c"]);
  });

  it("should handle out of range indexes", () => {
    const array = ["a", "b"];
    const pulled = pullAt(array, [2, -1]);
    expect(array).toEqual(["a", "b"]);
    expect(pulled).toEqual([undefined, undefined]);
  });

  it("should handle non-array input", () => {
    expect(pullAt(null, 1)).toEqual([]);
    expect(pullAt(undefined, 1)).toEqual([]);
  });
});
