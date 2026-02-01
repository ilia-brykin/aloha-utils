import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Creates a slice of array with n elements dropped from the end.
 *
 * @param {Array} array - The array to query.
 * @param {number} [n=1] - The number of elements to drop.
 * @return {Array} The slice of array.
 *
 * @example
 * dropRight([1, 2, 3]); // [1, 2]
 * dropRight([1, 2, 3], 2); // [1]
 */
export const dropRight = <T>(array: T[], n: unknown = 1): T[] => {
  if (!isArray(array)) {
    return [];
  }

  const count = toInteger(n);
  if (count <= 0) {
    return array.slice();
  }

  const end = array.length - count;
  if (end <= 0) {
    return [];
  }

  return array.slice(0, end);
};
