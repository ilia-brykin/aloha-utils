import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  partial,
} from "../../dist/index.js";

describe("partial function", () => {
  it("should apply partials", () => {
    const greet = (greeting, name) => `${greeting} ${name}`;
    const sayHelloTo = partial(greet, "hello");
    expect(sayHelloTo("fred")).toBe("hello fred");
  });

  it("should support placeholders", () => {
    const greet = (greeting, name) => `${greeting} ${name}`;
    const greetFred = partial(greet, partial.placeholder, "fred");
    expect(greetFred("hi")).toBe("hi fred");
  });
});
