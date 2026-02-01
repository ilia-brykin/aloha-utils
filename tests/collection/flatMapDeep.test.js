import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  flatMapDeep,
} from "../../dist/index.js";

describe("flatMapDeep function", () => {
  it("should map and deeply flatten", () => {
    const result = flatMapDeep([1, 2], value => [[[value, value]]]);
    expect(result).toEqual([1, 1, 2, 2]);
  });

  it("should support object collections", () => {
    const result = flatMapDeep({ a: 1, b: 2 }, value => [[value]]);
    expect(result).toEqual([1, 2]);
  });

  it("should use identity when iteratee omitted", () => {
    expect(flatMapDeep([1, [2]])).toEqual([1, 2]);
  });

  it("should handle empty collection", () => {
    expect(flatMapDeep([])).toEqual([]);
  });

  it("should handle nullish collection", () => {
    expect(flatMapDeep(null)).toEqual([]);
    expect(flatMapDeep(undefined)).toEqual([]);
  });
});
