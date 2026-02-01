import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import {
  defer,
} from "../../dist/index.js";

describe("defer function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should defer invocation", () => {
    const calls = [];
    defer(value => calls.push(value), "deferred");
    expect(calls).toEqual([]);
    jest.advanceTimersByTime(1);
    expect(calls).toEqual(["deferred"]);
  });
});
