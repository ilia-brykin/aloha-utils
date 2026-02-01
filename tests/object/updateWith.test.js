import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  updateWith,
} from "../../dist/index.js";

describe("updateWith function", () => {
  it("updates value at path using updater and customizer", () => {
    const object = {};
    updateWith(object, "[0][1]", () => "a", Object);
    expect(object).toEqual({ "0": { "1": "a" } });
  });
});
