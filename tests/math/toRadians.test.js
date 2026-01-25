import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  toRadians,
} from "../../dist/index.js";

describe("toRadians function", () => {
  it("should return undefined for non-numbers", () => {
    expect(toRadians("180")).toBe(undefined);
    expect(toRadians(null)).toBe(undefined);
    expect(toRadians(undefined)).toBe(undefined);
    expect(toRadians(NaN)).toBe(undefined);
  });

  it("should convert degrees to radians", () => {
    expect(toRadians(0)).toBe(0);
    expect(toRadians(180)).toBe(Math.PI);
    expect(toRadians(90)).toBe(Math.PI / 2);
    expect(toRadians(-180)).toBe(-Math.PI);
  });
});
