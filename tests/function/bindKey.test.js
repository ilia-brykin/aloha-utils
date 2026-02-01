import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  bindKey,
} from "../../dist/index.js";

describe("bindKey function", () => {
  it("should bind to method by key", () => {
    const object = {
      user: "fred",
      greet(greeting, punctuation) {
        return `${greeting} ${this.user}${punctuation}`;
      },
    };
    const bound = bindKey(object, "greet", "hi");
    expect(bound("!")).toBe("hi fred!");
  });

  it("should use updated method", () => {
    const object = {
      user: "fred",
      greet(greeting, punctuation) {
        return `${greeting} ${this.user}${punctuation}`;
      },
    };
    const bound = bindKey(object, "greet", "hi");
    object.greet = function (greeting, punctuation) {
      return `${greeting}ya ${this.user}${punctuation}`;
    };
    expect(bound("!")).toBe("hiya fred!");
  });

  it("should support placeholders", () => {
    const object = {
      user: "fred",
      greet(greeting, punctuation) {
        return `${greeting} ${this.user}${punctuation}`;
      },
    };
    const bound = bindKey(object, "greet", bindKey.placeholder, "!");
    expect(bound("hi")).toBe("hi fred!");
  });
});
