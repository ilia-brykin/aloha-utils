import {
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

import {
  random,
} from "../../dist/index.js";

const withMockedRandom = (value, fn) => {
  const spy = jest.spyOn(Math, "random").mockReturnValue(value);
  try {
    return fn();
  } finally {
    spy.mockRestore();
  }
};

describe("random function", () => {
  it("should return integers by default", () => {
    withMockedRandom(0, () => {
      expect(random()).toBe(0);
      expect(random(5)).toBe(0);
      expect(random(0, 5)).toBe(0);
    });

    withMockedRandom(0.9999999, () => {
      expect(random()).toBe(1);
      expect(random(5)).toBe(5);
      expect(random(0, 5)).toBe(5);
    });
  });

  it("should swap bounds when lower > upper", () => {
    withMockedRandom(0, () => {
      expect(random(5, 1)).toBe(1);
    });
  });

  it("should return floating when floating is true", () => {
    const result = withMockedRandom(0.5, () => random(5, true));
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(5);
    expect(Number.isInteger(result)).toBe(false);
  });

  it("should return floating when bounds are floats", () => {
    const result = withMockedRandom(0.5, () => random(1.2, 5.2));
    expect(result).toBeGreaterThanOrEqual(1.2);
    expect(result).toBeLessThanOrEqual(5.2);
    expect(Number.isInteger(result)).toBe(false);
  });

  it("should return floating when lower is float and upper integer", () => {
    const result = withMockedRandom(0.5, () => random(1.2, 5));
    expect(result).toBeGreaterThanOrEqual(1.2);
    expect(result).toBeLessThanOrEqual(5);
    expect(Number.isInteger(result)).toBe(false);
  });

  it("should return floating when upper is float and lower integer", () => {
    const result = withMockedRandom(0.5, () => random(1, 5.2));
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(5.2);
    expect(Number.isInteger(result)).toBe(false);
  });

  it("should handle boolean lower as floating flag", () => {
    const result = withMockedRandom(0.5, () => random(true));
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
    expect(Number.isInteger(result)).toBe(false);
  });

  it("should handle boolean upper as floating flag", () => {
    const result = withMockedRandom(0.5, () => random(3, true));
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(3);
  });

  it("should handle floating flag as third argument", () => {
    const result = withMockedRandom(0.5, () => random(1, 3, true));
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(3);
    expect(Number.isInteger(result)).toBe(false);
  });

  it("should produce integers when floating is false", () => {
    withMockedRandom(0.5, () => {
      const result = random(1, 3, false);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(3);
    });
  });

  it("should use lower as upper when only one number provided", () => {
    withMockedRandom(0.9999999, () => {
      expect(random(2)).toBe(2);
    });
  });

  it("should treat non-numeric inputs via toFinite", () => {
    withMockedRandom(0, () => {
      expect(random("5")).toBe(0);
      expect(random("2", "4")).toBe(2);
      expect(random(Infinity, 1)).toBe(1);
    });
  });

  it("should handle negative ranges", () => {
    withMockedRandom(0, () => {
      expect(random(-5, -1)).toBe(-5);
    });
    withMockedRandom(0.9999999, () => {
      expect(random(-5, -1)).toBe(-1);
    });
  });

  it("should handle mixed negative and positive bounds", () => {
    withMockedRandom(0, () => {
      expect(random(-2, 2)).toBe(-2);
    });
    withMockedRandom(0.9999999, () => {
      expect(random(-2, 2)).toBe(2);
    });
  });

  it("should return upper when random is 1 for float bounds", () => {
    const result = withMockedRandom(1, () => random(1.2, 5.2));
    expect(result).toBe(5.2);
  });

  it("should handle -0 lower bound", () => {
    withMockedRandom(0, () => {
      expect(Object.is(random(-0, 0), 0)).toBe(true);
    });
  });
});
