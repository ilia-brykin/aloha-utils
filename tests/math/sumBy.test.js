import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  sumBy,
} from "../../dist/index.js";

describe("sumBy function", () => {
  it("should return undefined for empty arrays", () => {
    expect(sumBy([], o => o)).toBe(undefined);
  });

  it("should sum numeric iteratee values (function)", () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(sumBy(objects, o => o.n)).toBe(3);
  });

  it("should sum numeric iteratee values (property)", () => {
    const objects = [{ n: 1 }, { n: 2 }];
    expect(sumBy(objects, "n")).toBe(3);
  });

  it("should support nested paths", () => {
    const objects = [{ a: { n: 1 } }, { a: { n: 2 } }];
    expect(sumBy(objects, "a.n")).toBe(3);
    expect(sumBy(objects, ["a", "n"])).toBe(3);
  });

  it("should ignore non-numeric iteratee results", () => {
    const objects = [{ n: "x" }, { n: 3 }, { n: NaN }];
    expect(sumBy(objects, "n")).toBe(3);
  });

  it("should return undefined if no numeric values exist", () => {
    const objects = [{ n: "x" }, { n: NaN }];
    expect(sumBy(objects, "n")).toBe(undefined);
  });
});
