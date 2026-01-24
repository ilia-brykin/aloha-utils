import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is a Map.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a Map.
 *
 * @example
 * isMap(new Map()); // true
 * isMap(new Set()); // false
 */
export const isMap = (value: unknown): value is Map<unknown, unknown> => {
  return toString.call(value) === "[object Map]";
};

