import {
  isArray,
} from "../lang";
import {
  baseSortedIndex,
} from "./_sortedHelpers.js";

const identity = (value: unknown): unknown => value;

/**
 * Uses a binary search to determine the lowest index at which value should be
 * inserted into array in order to maintain its sort order.
 *
 * @param {Array} array - The sorted array to inspect.
 * @param {*} value - The value to evaluate.
 * @return {number} The index at which value should be inserted into array.
 *
 * @example
 * sortedIndex([30, 50], 40); // 1
 */
export const sortedIndex = <T>(array: T[], value: T): number => {
  if (!isArray(array)) {
    return 0;
  }

  return baseSortedIndex(array, value, identity, false);
};
