import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  minBy,
} from "../../dist/index.js";

describe("minBy function", () => {
  it("should return undefined for empty arrays", () => {
    expect(minBy([], o => o)).toBe(undefined);
  });

  it("should return element with minimum numeric iteratee value (function)", () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(minBy(objects, o => o.n)).toBe(objects[0]);
  });

  it("should return element with minimum numeric iteratee value (property)", () => {
    const objects = [{ n: 2 }, { n: 1 }];
    expect(minBy(objects, "n")).toBe(objects[1]);
  });

  it("should support nested paths", () => {
    const objects = [{ a: { n: 2 } }, { a: { n: 1 } }];
    expect(minBy(objects, "a.n")).toBe(objects[1]);
    expect(minBy(objects, ["a", "n"])).toBe(objects[1]);
  });

  it("should ignore non-numeric iteratee results", () => {
    const objects = [{ n: "x" }, { n: 3 }, { n: NaN }];
    expect(minBy(objects, "n")).toBe(objects[1]);
  });

  it("should return undefined if no numeric values exist", () => {
    const objects = [{ n: "x" }, { n: NaN }];
    expect(minBy(objects, "n")).toBe(undefined);
  });

  it("should handle negative and zero values", () => {
    const objects = [{ n: 0 }, { n: -1 }, { n: 2 }];
    expect(minBy(objects, "n")).toBe(objects[1]);
  });

  it("should keep first element on ties", () => {
    const objects = [{ n: 1 }, { n: 1 }, { n: 2 }];
    expect(minBy(objects, "n")).toBe(objects[0]);
  });

  it("should ignore elements with missing path", () => {
    const objects = [{ a: { n: 2 } }, { a: {} }, { a: { n: 1 } }];
    expect(minBy(objects, "a.n")).toBe(objects[2]);
  });

  it("should handle array index path", () => {
    const objects = [{ a: [3] }, { a: [1] }, { a: [2] }];
    expect(minBy(objects, ["a", 0])).toBe(objects[1]);
  });

  it("should work with iteratee returning Infinity", () => {
    const objects = [{ n: 1 }, { n: Infinity }, { n: 2 }];
    expect(minBy(objects, "n")).toBe(objects[0]);
  });

  it("should return undefined when array is not an array", () => {
    expect(minBy(undefined, "n")).toBe(undefined);
    expect(minBy(null, "n")).toBe(undefined);
  });
});
