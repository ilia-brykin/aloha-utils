import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  mapValues,
} from "../../dist/index.js";

describe("mapValues function", () => {
  it("maps values using iteratee", () => {
    const result = mapValues({ a: 1, b: 2 }, value => value * 2);
    expect(result).toEqual({ a: 2, b: 4 });
  });

  it("supports property shorthand", () => {
    const users = {
      fred: { age: 40 },
      pebbles: { age: 1 },
    };
    expect(mapValues(users, "age")).toEqual({ fred: 40, pebbles: 1 });
  });
});
