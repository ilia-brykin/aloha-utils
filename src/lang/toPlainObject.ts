import {
  isNil,
} from "./index.js";

/**
 * Converts a value to a plain object, flattening inherited enumerable
 * string keyed properties to own properties.
 *
 * @param {*} value - The value to convert.
 * @return {Object} The plain object representation.
 *
 * @example
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * toPlainObject(new Foo()); // { b: 2, c: 3 }
 */
export const toPlainObject = (value: unknown): Record<string, unknown> => {
  if (isNil(value)) {
    return {};
  }

  const result: Record<string, unknown> = {};
  const obj = Object(value) as Record<string, unknown>;

  for (const key in obj) {
    result[key] = obj[key];
  }

  return result;
};
