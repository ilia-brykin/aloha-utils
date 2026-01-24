import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is an Error instance.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an Error.
 *
 * @example
 * isError(new Error("boom")); // true
 * isError({ message: "boom" }); // false
 */
export const isError = (value: unknown): value is Error => {
  return value instanceof Error || toString.call(value) === "[object Error]";
};
