import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  join,
} from "../../dist/index.js";

describe("join function", () => {
  it("should join elements with separator", () => {
    expect(join(["a", "b", "c"], "~")).toBe("a~b~c");
  });

  it("should use default separator", () => {
    expect(join(["a", "b", "c"])).toBe("a,b,c");
  });

  it("should handle empty array", () => {
    expect(join([])).toBe("");
  });

  it("should handle non-array input", () => {
    expect(join(null)).toBe("");
    expect(join(undefined)).toBe("");
    expect(join({ a: 1 })).toBe("");
  });
});
