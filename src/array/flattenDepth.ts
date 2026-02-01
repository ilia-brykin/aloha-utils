import {
  flattenDepthInternal,
} from "./_flattenHelpers.js";
import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Recursively flatten array up to depth times.
 *
 * @param {Array} array - The array to flatten.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @return {Array} The new flattened array.
 *
 * @example
 * flattenDepth([1, [2, [3, [4]], 5]], 2); // [1, 2, 3, [4], 5]
 */
export const flattenDepth = <T>(array: T[], depth: unknown = 1): T[] => {
  if (!isArray(array)) {
    return [];
  }

  const resolvedDepth = toInteger(depth);
  if (resolvedDepth < 1) {
    return array.slice();
  }

  return flattenDepthInternal(array, resolvedDepth) as T[];
};
