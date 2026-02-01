import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  before,
} from "../../dist/index.js";

describe("before function", () => {
  it("should invoke func while called less than n times", () => {
    const calls = [];
    const fn = before(3, value => {
      calls.push(value);
      return value;
    });

    expect(fn("a")).toBe("a");
    expect(fn("b")).toBe("b");
    expect(fn("c")).toBe("b");
    expect(fn("d")).toBe("b");
    expect(calls).toEqual(["a", "b"]);
  });
});
