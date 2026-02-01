import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Creates a slice of array with n elements taken from the end.
 *
 * @param {Array} array - The array to query.
 * @param {number} [n=1] - The number of elements to take.
 * @return {Array} The slice of array.
 *
 * @example
 * takeRight([1, 2, 3]); // [3]
 */
export const takeRight = <T>(array: T[], n: unknown = 1): T[] => {
  if (!isArray(array)) {
    return [];
  }

  const length = array.length;
  if (length === 0) {
    return [];
  }

  const count = toInteger(n);
  if (count <= 0) {
    return [];
  }

  if (count >= length) {
    return array.slice();
  }

  return array.slice(length - count);
};
