import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sumAbsBy,
} from "../../dist/index.js";

describe("sumAbsBy function", () => {
  it("should return undefined for empty arrays", () => {
    expect(sumAbsBy([], o => o)).toBe(undefined);
  });

  it("should sum absolute numeric iteratee values (function)", () => {
    const objects = [{ n: 1 }, { n: -2 }];
    expect(sumAbsBy(objects, o => o.n)).toBe(3);
  });

  it("should sum absolute numeric iteratee values (property)", () => {
    const objects = [{ n: 1 }, { n: -2 }];
    expect(sumAbsBy(objects, "n")).toBe(3);
  });

  it("should support nested paths", () => {
    const objects = [{ a: { n: 1 } }, { a: { n: -2 } }];
    expect(sumAbsBy(objects, "a.n")).toBe(3);
    expect(sumAbsBy(objects, ["a", "n"])).toBe(3);
  });

  it("should ignore non-numeric iteratee results", () => {
    const objects = [{ n: "x" }, { n: -3 }, { n: NaN }];
    expect(sumAbsBy(objects, "n")).toBe(3);
  });

  it("should return undefined if no numeric values exist", () => {
    const objects = [{ n: "x" }, { n: NaN }];
    expect(sumAbsBy(objects, "n")).toBe(undefined);
  });

  it("should handle zeros and floats", () => {
    const objects = [{ n: 0 }, { n: -0 }, { n: -0.5 }, { n: 0.5 }];
    expect(sumAbsBy(objects, "n")).toBe(1);
  });

  it("should return Infinity when iteratee returns Infinity", () => {
    const objects = [{ n: Infinity }, { n: -2 }];
    expect(sumAbsBy(objects, "n")).toBe(Infinity);
  });

  it("should ignore elements with missing path", () => {
    const objects = [{ a: { n: -2 } }, { a: {} }, { a: { n: 1 } }];
    expect(sumAbsBy(objects, "a.n")).toBe(3);
  });
});
