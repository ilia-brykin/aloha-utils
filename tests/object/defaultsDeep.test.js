import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  defaultsDeep,
} from "../../dist/index.js";

describe("defaultsDeep function", () => {
  it("recursively assigns default properties", () => {
    const result = defaultsDeep({ a: { b: 2 } }, { a: { b: 1, c: 3 } });
    expect(result).toEqual({ a: { b: 2, c: 3 } });
  });

  it("does not overwrite existing nested values", () => {
    const result = defaultsDeep({ a: { b: 2, c: 4 } }, { a: { b: 1, c: 3 } });
    expect(result).toEqual({ a: { b: 2, c: 4 } });
  });

  it("fills missing array positions", () => {
    const result = defaultsDeep({ a: [1] }, { a: [2, 3] });
    expect(result).toEqual({ a: [1, 3] });
  });
});
