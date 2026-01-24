import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is a RegExp.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a RegExp.
 *
 * @example
 * isRegExp(/test/); // true
 * isRegExp("test"); // false
 */
export const isRegExp = (value: unknown): value is RegExp => {
  return toString.call(value) === "[object RegExp]";
};
