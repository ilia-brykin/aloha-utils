import {
  flattenDepthInternal,
} from "./_flattenHelpers.js";
import {
  isArray,
} from "../lang";

/**
 * Flattens array a single level deep.
 *
 * @param {Array} array - The array to flatten.
 * @return {Array} The new flattened array.
 *
 * @example
 * flatten([1, [2, [3, [4]], 5]]); // [1, 2, [3, [4]], 5]
 */
export const flatten = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  return flattenDepthInternal(array, 1) as T[];
};
