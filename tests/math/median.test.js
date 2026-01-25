import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  median,
} from "../../dist/index.js";

describe("median function", () => {
  it("should return undefined with no arguments or empty arrays", () => {
    expect(median()).toBe(undefined);
    expect(median([])).toBe(undefined);
  });

  it("should return median for odd length arrays", () => {
    expect(median([1, 3, 2])).toBe(2);
    expect(median([5, 1, 3])).toBe(3);
  });

  it("should return median for even length arrays", () => {
    expect(median([1, 2, 3, 4])).toBe(2.5);
    expect(median([10, 0, 2, 4])).toBe(3);
  });

  it("should return median from arguments", () => {
    expect(median(1, 3, 2)).toBe(2);
    expect(median(1, 2, 3, 4)).toBe(2.5);
  });

  it("should ignore non-number values", () => {
    expect(median([1, "2", 3])).toBe(2);
    expect(median(1, "2", 3)).toBe(2);
    expect(median([NaN, "x"])).toBe(undefined);
  });

  it("should prefer first argument array when provided", () => {
    expect(median([1, 9, 3], 2)).toBe(3);
  });
});
