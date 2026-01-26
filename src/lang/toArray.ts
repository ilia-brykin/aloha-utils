import {
  isArray,
  isArrayLike,
  isIterable,
  isNil,
  isObject,
  isString,
} from "./index.js";

/**
 * Converts a value to an array.
 *
 * @param {*} value - The value to convert.
 * @return {Array} The array representation.
 *
 * @example
 * toArray({ a: 1, b: 2 }); // [1, 2]
 * toArray("abc"); // ["a", "b", "c"]
 * toArray(1); // []
 * toArray(null); // []
 */
export const toArray = (value: unknown): unknown[] => {
  if (isNil(value)) {
    return [];
  }

  if (isArray(value)) {
    return value.slice();
  }

  if (isString(value)) {
    return Array.from(value);
  }

  if (isArrayLike(value)) {
    return Array.from(value as ArrayLike<unknown>);
  }

  if (isIterable(value)) {
    return Array.from(value as Iterable<unknown>);
  }

  if (isObject(value)) {
    return Object.values(value);
  }

  return [];
};
