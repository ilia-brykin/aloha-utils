import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  keyBy,
} from "../../dist/index.js";

describe("keyBy function", () => {
  it("should key by iteratee result", () => {
    const array = [
      { dir: "left", code: 97 },
      { dir: "right", code: 100 },
    ];
    const result = keyBy(array, value => String.fromCharCode(value.code));
    expect(result).toEqual({
      a: { dir: "left", code: 97 },
      d: { dir: "right", code: 100 },
    });
  });

  it("should support property iteratee shorthand", () => {
    const array = [
      { dir: "left", code: 97 },
      { dir: "right", code: 100 },
    ];
    const result = keyBy(array, "dir");
    expect(result).toEqual({
      left: { dir: "left", code: 97 },
      right: { dir: "right", code: 100 },
    });
  });

  it("should handle object collections", () => {
    const result = keyBy({ a: { id: 1 }, b: { id: 2 } }, "id");
    expect(result).toEqual({
      "1": { id: 1 },
      "2": { id: 2 },
    });
  });

  it("should handle empty collection", () => {
    expect(keyBy([])).toEqual({});
  });

  it("should handle nullish collection", () => {
    expect(keyBy(null)).toEqual({});
    expect(keyBy(undefined)).toEqual({});
  });
});
