import {
  isArray,
} from "../lang";

/**
 * Gets all but the last element of array.
 *
 * @param {Array} array - The array to query.
 * @return {Array} The slice of array.
 *
 * @example
 * initial([1, 2, 3]); // [1, 2]
 */
export const initial = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  return array.slice(0, -1);
};
