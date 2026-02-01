import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  wrap,
} from "../../dist/index.js";

describe("wrap function", () => {
  it("should wrap value with wrapper", () => {
    const wrapped = wrap(
      text => text.toUpperCase(),
      (func, text) => `<p>${func(text)}</p>`,
    );
    expect(wrapped("hi")).toBe("<p>HI</p>");
  });
});
