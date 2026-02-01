import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  mapKeys,
} from "../../dist/index.js";

describe("mapKeys function", () => {
  it("maps keys using iteratee", () => {
    const result = mapKeys({ a: 1, b: 2 }, (value, key) => `${key}${value}`);
    expect(result).toEqual({ a1: 1, b2: 2 });
  });

  it("does not mutate original object", () => {
    const object = { a: 1, b: 2 };
    const result = mapKeys(object, (_value, key) => key.toUpperCase());
    expect(result).toEqual({ A: 1, B: 2 });
    expect(object).toEqual({ a: 1, b: 2 });
  });
});
