import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is a Date object.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a Date.
 *
 * @example
 * isDate(new Date()); // true
 * isDate(Date.now()); // false
 */
export const isDate = (value: unknown): value is Date => {
  return toString.call(value) === "[object Date]";
};
