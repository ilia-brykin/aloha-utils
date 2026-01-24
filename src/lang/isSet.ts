import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is a Set.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a Set.
 *
 * @example
 * isSet(new Set()); // true
 * isSet(new Map()); // false
 */
export const isSet = (value: unknown): value is Set<unknown> => {
  return toString.call(value) === "[object Set]";
};
