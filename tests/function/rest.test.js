import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  rest,
} from "../../dist/index.js";

describe("rest function", () => {
  it("should collect rest arguments", () => {
    const fn = rest((what, names) => `${what} ${names.join(", ")}`);
    expect(fn("hello", "fred", "barney")).toBe("hello fred, barney");
  });
});
