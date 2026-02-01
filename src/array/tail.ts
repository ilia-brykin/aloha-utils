import {
  isArray,
} from "../lang";

/**
 * Gets all but the first element of array.
 *
 * @param {Array} array - The array to query.
 * @return {Array} The slice of array.
 *
 * @example
 * tail([1, 2, 3]); // [2, 3]
 */
export const tail = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  return array.slice(1);
};
