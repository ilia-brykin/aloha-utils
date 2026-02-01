import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  bind,
} from "../../dist/index.js";

describe("bind function", () => {
  it("should bind this and partials", () => {
    const object = { user: "fred" };
    const greet = function (greeting, punctuation) {
      return `${greeting} ${this.user}${punctuation}`;
    };
    const bound = bind(greet, object, "hi");
    expect(bound("!")).toBe("hi fred!");
  });

  it("should support placeholders", () => {
    const object = { user: "fred" };
    const greet = function (greeting, punctuation) {
      return `${greeting} ${this.user}${punctuation}`;
    };
    const bound = bind(greet, object, bind.placeholder, "!");
    expect(bound("hi")).toBe("hi fred!");
  });
});
