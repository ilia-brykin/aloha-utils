import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is an arguments object.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an arguments object.
 *
 * @example
 * isArguments((function example() { return arguments; })()); // true
 * isArguments([]); // false
 */
export const isArguments = (value: unknown): value is IArguments => {
  return toString.call(value) === "[object Arguments]";
};
