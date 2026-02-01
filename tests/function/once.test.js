import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  once,
} from "../../dist/index.js";

describe("once function", () => {
  it("should invoke func once", () => {
    let count = 0;
    const fn = once(() => {
      count += 1;
      return count;
    });

    expect(fn()).toBe(1);
    expect(fn()).toBe(1);
    expect(count).toBe(1);
  });
});
