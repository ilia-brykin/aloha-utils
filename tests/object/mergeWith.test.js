import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  mergeWith,
} from "../../dist/index.js";

describe("mergeWith function", () => {
  it("uses customizer to merge values", () => {
    const customizer = (objValue, srcValue) => {
      if (Array.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    };

    const object = { a: [1], b: [2] };
    const other = { a: [3], b: [4] };
    expect(mergeWith(object, other, customizer)).toEqual({
      a: [1, 3],
      b: [2, 4],
    });
  });

  it("falls back to default merge when customizer returns undefined", () => {
    const customizer = () => undefined;
    const object = { a: { b: 1 } };
    const other = { a: { c: 2 } };
    expect(mergeWith(object, other, customizer)).toEqual({ a: { b: 1, c: 2 } });
  });
});
