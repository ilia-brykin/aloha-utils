import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toDegrees,
} from "../../dist/index.js";

describe("toDegrees function", () => {
  it("should return undefined for non-numbers", () => {
    expect(toDegrees("3.14")).toBe(undefined);
    expect(toDegrees(null)).toBe(undefined);
    expect(toDegrees(undefined)).toBe(undefined);
    expect(toDegrees(NaN)).toBe(undefined);
  });

  it("should convert radians to degrees", () => {
    expect(toDegrees(0)).toBe(0);
    expect(toDegrees(Math.PI)).toBe(180);
    expect(toDegrees(Math.PI / 2)).toBe(90);
    expect(toDegrees(-Math.PI)).toBe(-180);
  });
});
