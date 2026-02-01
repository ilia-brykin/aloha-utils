import {
  baseSortedIndex,
} from "./_sortedHelpers.js";
import {
  isArray,
} from "../lang";

const identity = (value: unknown): unknown => value;

/**
 * This method is like sortedIndex except that it returns the highest index at
 * which value should be inserted into array in order to maintain its sort order.
 *
 * @param {Array} array - The sorted array to inspect.
 * @param {*} value - The value to evaluate.
 * @return {number} The index at which value should be inserted into array.
 *
 * @example
 * sortedLastIndex([4, 5, 5, 5, 6], 5); // 4
 */
export const sortedLastIndex = <T>(array: T[], value: T): number => {
  if (!isArray(array)) {
    return 0;
  }

  return baseSortedIndex(array, value, identity, true);
};
