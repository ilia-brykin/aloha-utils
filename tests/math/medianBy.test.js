import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  medianBy,
} from "../../dist/index.js";

describe("medianBy function", () => {
  it("should return undefined for empty arrays", () => {
    expect(medianBy([], o => o)).toBe(undefined);
  });

  it("should return median of numeric iteratee values (function)", () => {
    const objects = [{ n: 1 }, { n: 3 }, { n: 2 }];
    expect(medianBy(objects, o => o.n)).toBe(2);
  });

  it("should return median of numeric iteratee values (property)", () => {
    const objects = [{ n: 1 }, { n: 3 }, { n: 2 }];
    expect(medianBy(objects, "n")).toBe(2);
  });

  it("should support nested paths", () => {
    const objects = [{ a: { n: 1 } }, { a: { n: 3 } }, { a: { n: 2 } }];
    expect(medianBy(objects, "a.n")).toBe(2);
    expect(medianBy(objects, ["a", "n"])).toBe(2);
  });

  it("should return median for even count", () => {
    const objects = [{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }];
    expect(medianBy(objects, "n")).toBe(2.5);
  });

  it("should ignore non-numeric iteratee results", () => {
    const objects = [{ n: "x" }, { n: 3 }, { n: NaN }];
    expect(medianBy(objects, "n")).toBe(3);
  });

  it("should return undefined if no numeric values exist", () => {
    const objects = [{ n: "x" }, { n: NaN }];
    expect(medianBy(objects, "n")).toBe(undefined);
  });
});
