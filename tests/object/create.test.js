import {
  describe,
  expect,
  it,
} from "@jest/globals";

import {
  create,
} from "../../dist/index.js";

describe("create function", () => {
  it("creates object inheriting from prototype", () => {
    function Shape() {
      this.x = 0;
      this.y = 0;
    }

    function Circle() {
      Shape.call(this);
    }

    Circle.prototype = create(Shape.prototype, { constructor: Circle });

    const circle = new Circle();
    expect(circle instanceof Circle).toBe(true);
    expect(circle instanceof Shape).toBe(true);
  });

  it("assigns properties to created object", () => {
    const proto = { a: 1 };
    const obj = create(proto, { b: 2 });
    expect(Object.getPrototypeOf(obj)).toBe(proto);
    expect(obj).toEqual({ b: 2 });
  });

  it("supports null prototype", () => {
    const obj = create(null);
    expect(Object.getPrototypeOf(obj)).toBe(null);
  });
});
