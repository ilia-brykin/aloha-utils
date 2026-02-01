import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  negate,
} from "../../dist/index.js";

describe("negate function", () => {
  it("should negate predicate result", () => {
    const isEven = n => n % 2 === 0;
    const isOdd = negate(isEven);
    expect([1, 2, 3, 4].filter(isOdd)).toEqual([1, 3]);
  });
});
