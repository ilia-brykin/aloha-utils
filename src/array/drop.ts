import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Creates a slice of array with n elements dropped from the beginning.
 *
 * @param {Array} array - The array to query.
 * @param {number} [n=1] - The number of elements to drop.
 * @return {Array} The slice of array.
 *
 * @example
 * drop([1, 2, 3]); // [2, 3]
 * drop([1, 2, 3], 2); // [3]
 */
export const drop = <T>(array: T[], n: unknown = 1): T[] => {
  if (!isArray(array)) {
    return [];
  }

  const count = toInteger(n);
  if (count <= 0) {
    return array.slice();
  }

  return array.slice(count);
};
