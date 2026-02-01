import {
  flattenDepthInternal,
} from "./_flattenHelpers.js";
import {
  isArray,
} from "../lang";

/**
 * Recursively flattens array.
 *
 * @param {Array} array - The array to flatten.
 * @return {Array} The new flattened array.
 *
 * @example
 * flattenDeep([1, [2, [3, [4]], 5]]); // [1, 2, 3, 4, 5]
 */
export const flattenDeep = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  return flattenDepthInternal(array, Number.POSITIVE_INFINITY) as T[];
};
