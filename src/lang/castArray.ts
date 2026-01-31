import {
  isArray,
} from "./isArray.js";

/**
 * Casts a value as an array if it's not one.
 *
 * @param {*} [value] - The value to cast.
 * @return {Array} The cast array.
 *
 * @example
 * castArray(1); // [1]
 * castArray({ a: 1 }); // [{ a: 1 }]
 * castArray("abc"); // ["abc"]
 * castArray(null); // [null]
 * castArray(); // []
 */
export function castArray(value?: unknown): unknown[] {
  if (arguments.length === 0) {
    return [];
  }

  return isArray(value) ? value : [value];
}
