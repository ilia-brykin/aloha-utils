import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is a WeakSet.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a WeakSet.
 *
 * @example
 * isWeakSet(new WeakSet()); // true
 * isWeakSet(new Set()); // false
 */
export const isWeakSet = (value: unknown): value is WeakSet<object> => {
  return toString.call(value) === "[object WeakSet]";
};
