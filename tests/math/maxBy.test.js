import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  maxBy,
} from "../../dist/index.js";

describe("maxBy function", () => {
  it("should return undefined for empty arrays", () => {
    expect(maxBy([], o => o)).toBe(undefined);
  });

  it("should return element with maximum numeric iteratee value (function)", () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(maxBy(objects, o => o.n)).toBe(objects[1]);
  });

  it("should return element with maximum numeric iteratee value (property)", () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(maxBy(objects, "n")).toBe(objects[1]);
  });

  it("should support nested paths", () => {
    const objects = [{ a: { n: 1 } }, { a: { n: 2 } }];
    expect(maxBy(objects, "a.n")).toBe(objects[1]);
    expect(maxBy(objects, ["a", "n"])).toBe(objects[1]);
  });

  it("should ignore non-numeric iteratee results", () => {
    const objects = [{ n: "x" }, { n: 3 }, { n: NaN }];
    expect(maxBy(objects, "n")).toBe(objects[1]);
  });

  it("should return undefined if no numeric values exist", () => {
    const objects = [{ n: "x" }, { n: NaN }];
    expect(maxBy(objects, "n")).toBe(undefined);
  });

  it("should handle negative and zero values", () => {
    const objects = [{ n: 0 }, { n: -1 }, { n: 2 }];
    expect(maxBy(objects, "n")).toBe(objects[2]);
  });

  it("should keep first element on ties", () => {
    const objects = [{ n: 1 }, { n: 1 }, { n: 2 }];
    expect(maxBy(objects, "n")).toBe(objects[2]);
  });

  it("should ignore elements with missing path", () => {
    const objects = [{ a: { n: 1 } }, { a: {} }, { a: { n: 2 } }];
    expect(maxBy(objects, "a.n")).toBe(objects[2]);
  });

  it("should handle array index path", () => {
    const objects = [{ a: [3] }, { a: [1] }, { a: [2] }];
    expect(maxBy(objects, ["a", 0])).toBe(objects[0]);
  });

  it("should work with iteratee returning -Infinity", () => {
    const objects = [{ n: -Infinity }, { n: 1 }];
    expect(maxBy(objects, "n")).toBe(objects[1]);
  });

  it("should return undefined when array is not an array", () => {
    expect(maxBy(undefined, "n")).toBe(undefined);
    expect(maxBy(null, "n")).toBe(undefined);
  });
});
