import {
  includesSameValueZero,
} from "./_compareHelpers.js";
import {
  isArray,
} from "../lang";

/**
 * Creates a duplicate-free version of an array, using SameValueZero for equality
 * comparisons, in which only the first occurrence of each element is kept.
 *
 * @param {Array} array - The array to inspect.
 * @return {Array} The new duplicate free array.
 *
 * @example
 * uniq([2, 1, 2]); // [2, 1]
 */
export const uniq = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  const result: T[] = [];
  for (const value of array) {
    if (!includesSameValueZero(result, value)) {
      result.push(value);
    }
  }

  return result;
};
