import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  isPromise,
} from "../../dist/index.js";

describe("isPromise function", () => {
  it("should return true for Promises", () => {
    expect(isPromise(Promise.resolve(1))).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
    const rejected = Promise.reject(new Error("x"));
    rejected.catch(() => {});
    expect(isPromise(rejected)).toBe(true);
  });

  it("should return false for non-promises", () => {
    const thenable = {
      then() {

      },
    };
    const thenableWithCatch = {
      then() {
      },
      catch() {
      },
    };
    const fn = function example() {

    };

    expect(isPromise(thenable)).toBe(false);
    expect(isPromise(thenableWithCatch)).toBe(true);
    expect(isPromise(fn)).toBe(false);
    expect(isPromise([])).toBe(false);
    expect(isPromise({})).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
  });
});
