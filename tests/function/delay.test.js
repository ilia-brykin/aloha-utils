import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import {
  delay,
} from "../../dist/index.js";

describe("delay function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should invoke after wait", () => {
    const calls = [];
    delay(value => calls.push(value), 100, "later");
    jest.advanceTimersByTime(99);
    expect(calls).toEqual([]);
    jest.advanceTimersByTime(1);
    expect(calls).toEqual(["later"]);
  });
});
