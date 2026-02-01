import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  after,
} from "../../dist/index.js";

describe("after function", () => {
  it("should invoke func after n calls", () => {
    const calls = [];
    const fn = after(2, value => {
      calls.push(value);
      return value;
    });

    expect(fn("a")).toBeUndefined();
    expect(fn("b")).toBe("b");
    expect(fn("c")).toBe("c");
    expect(calls).toEqual(["b", "c"]);
  });
});
