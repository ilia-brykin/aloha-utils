import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is a WeakMap.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a WeakMap.
 *
 * @example
 * isWeakMap(new WeakMap()); // true
 * isWeakMap(new Map()); // false
 */
export const isWeakMap = (value: unknown): value is WeakMap<object, unknown> => {
  return toString.call(value) === "[object WeakMap]";
};
