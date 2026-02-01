import {
  baseSortedIndex,
} from "./_sortedHelpers.js";
import {
  eq,
  isArray,
} from "../lang";

const identity = (value: unknown): unknown => value;

/**
 * This method is like indexOf except that it performs a binary search on a
 * sorted array.
 *
 * @param {Array} array - The array to inspect.
 * @param {*} value - The value to search for.
 * @return {number} The index of the matched value, else -1.
 *
 * @example
 * sortedIndexOf([4, 5, 5, 5, 6], 5); // 1
 */
export const sortedIndexOf = <T>(array: T[], value: T): number => {
  if (!isArray(array)) {
    return -1;
  }

  const index = baseSortedIndex(array, value, identity, false);
  if (index < array.length && eq(array[index], value)) {
    return index;
  }

  return -1;
};
