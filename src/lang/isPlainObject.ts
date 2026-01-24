import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is a plain object.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a plain object.
 *
 * @example
 * isPlainObject({}); // true
 * isPlainObject(new (class Foo {})()); // false
 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (toString.call(value) !== "[object Object]") {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  return proto === null || proto === Object.prototype;
};

