import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isAsyncFunction,
} from "../../dist/index.js";

describe("isAsyncFunction function", () => {
  it("should return true for async functions", () => {
    const asyncFn = async function example() {

    };
    const asyncArrow = async() => {};

    expect(isAsyncFunction(asyncFn)).toBe(true);
    expect(isAsyncFunction(asyncArrow)).toBe(true);
  });

  it("should return false for non-async functions", () => {
    const fn = function example() {

    };
    class Example {

    }

    expect(isAsyncFunction(fn)).toBe(false);
    expect(isAsyncFunction(() => {})).toBe(false);
    expect(isAsyncFunction(Example)).toBe(false);
    expect(isAsyncFunction({})).toBe(false);
    expect(isAsyncFunction(null)).toBe(false);
    expect(isAsyncFunction(undefined)).toBe(false);
  });
});
