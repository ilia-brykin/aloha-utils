import {
  baseSortedIndex,
} from "./_sortedHelpers.js";
import {
  eq,
  isArray,
} from "../lang";

const identity = (value: unknown): unknown => value;

/**
 * This method is like lastIndexOf except that it performs a binary search on a
 * sorted array.
 *
 * @param {Array} array - The array to inspect.
 * @param {*} value - The value to search for.
 * @return {number} The index of the matched value, else -1.
 *
 * @example
 * sortedLastIndexOf([4, 5, 5, 5, 6], 5); // 3
 */
export const sortedLastIndexOf = <T>(array: T[], value: T): number => {
  if (!isArray(array)) {
    return -1;
  }

  const index = baseSortedIndex(array, value, identity, true) - 1;
  if (index >= 0 && eq(array[index], value)) {
    return index;
  }

  return -1;
};
