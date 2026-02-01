import {
  isArray,
} from "../lang/isArray.js";

/**
 * Creates an array with all falsey values removed.
 *
 * @param {Array} array - The array to compact.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * compact([0, 1, false, 2, "", 3]); // [1, 2, 3]
 */
export const compact = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  return array.filter(Boolean);
};
