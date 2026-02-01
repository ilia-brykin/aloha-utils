import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  shuffle,
} from "../../dist/index.js";

describe("shuffle function", () => {
  it("should return array with same elements", () => {
    const array = [1, 2, 3, 4];
    const result = shuffle(array);
    expect(result.sort()).toEqual(array.slice().sort());
  });

  it("should handle object collections", () => {
    const result = shuffle({ a: 1, b: 2 });
    expect(result.sort()).toEqual([1, 2]);
  });

  it("should handle empty collection", () => {
    expect(shuffle([])).toEqual([]);
  });
});
