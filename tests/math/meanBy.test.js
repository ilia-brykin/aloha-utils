import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  meanBy,
} from "../../dist/index.js";

describe("meanBy function", () => {
  it("should return undefined for empty arrays", () => {
    expect(meanBy([], o => o)).toBe(undefined);
  });

  it("should return mean of numeric iteratee values (function)", () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(meanBy(objects, o => o.n)).toBe(1.5);
  });

  it("should return mean of numeric iteratee values (property)", () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(meanBy(objects, "n")).toBe(1.5);
  });

  it("should support nested paths", () => {
    const objects = [{ a: { n: 1 } }, { a: { n: 2 } }];
    expect(meanBy(objects, "a.n")).toBe(1.5);
    expect(meanBy(objects, ["a", "n"])).toBe(1.5);
  });

  it("should ignore non-numeric iteratee results", () => {
    const objects = [{ n: "x" }, { n: 3 }, { n: NaN }];
    expect(meanBy(objects, "n")).toBe(3);
  });

  it("should return undefined if no numeric values exist", () => {
    const objects = [{ n: "x" }, { n: NaN }];
    expect(meanBy(objects, "n")).toBe(undefined);
  });
});
