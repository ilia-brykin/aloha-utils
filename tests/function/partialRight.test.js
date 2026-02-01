import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  partialRight,
} from "../../dist/index.js";

describe("partialRight function", () => {
  it("should apply partials to the right", () => {
    const greet = (greeting, name) => `${greeting} ${name}`;
    const greetFred = partialRight(greet, "fred");
    expect(greetFred("hi")).toBe("hi fred");
  });

  it("should support placeholders", () => {
    const greet = (greeting, name) => `${greeting} ${name}`;
    const sayHelloTo = partialRight(greet, "hello", partialRight.placeholder);
    expect(sayHelloTo("fred")).toBe("hello fred");
  });
});
