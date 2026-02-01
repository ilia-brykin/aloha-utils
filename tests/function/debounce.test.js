import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import {
  debounce,
} from "../../dist/index.js";

describe("debounce function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should debounce calls", () => {
    const calls = [];
    const fn = debounce(value => calls.push(value), 100);
    fn(1);
    fn(2);
    jest.advanceTimersByTime(99);
    expect(calls).toEqual([]);
    jest.advanceTimersByTime(1);
    expect(calls).toEqual([2]);
  });

  it("should support leading option", () => {
    const calls = [];
    const fn = debounce(value => calls.push(value), 100, { leading: true, trailing: false });
    fn(1);
    fn(2);
    expect(calls).toEqual([1]);
    jest.advanceTimersByTime(100);
    expect(calls).toEqual([1]);
  });

  it("should support cancel", () => {
    const calls = [];
    const fn = debounce(value => calls.push(value), 100);
    fn(1);
    fn.cancel();
    jest.advanceTimersByTime(100);
    expect(calls).toEqual([]);
  });

  it("should support flush", () => {
    const calls = [];
    const fn = debounce(value => calls.push(value), 100);
    fn(1);
    fn.flush();
    expect(calls).toEqual([1]);
  });
});
