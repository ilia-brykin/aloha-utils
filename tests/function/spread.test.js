import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  spread,
} from "../../dist/index.js";

describe("spread function", () => {
  it("should spread array arguments", () => {
    const say = spread((who, what) => `${who} says ${what}`);
    expect(say(["fred", "hello"])).toBe("fred says hello");
  });
});
