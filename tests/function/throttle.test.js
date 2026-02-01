import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import {
  throttle,
} from "../../dist/index.js";

describe("throttle function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should throttle calls", () => {
    const calls = [];
    const fn = throttle(value => calls.push(value), 100);
    fn(1);
    fn(2);
    jest.advanceTimersByTime(99);
    expect(calls).toEqual([1]);
    jest.advanceTimersByTime(1);
    expect(calls).toEqual([1, 2]);
  });
});
