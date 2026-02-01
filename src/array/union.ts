import {
  includesSameValueZero,
} from "./_compareHelpers.js";
import {
  isArray,
} from "../lang";

/**
 * Creates an array of unique values, in order, from all given arrays using
 * SameValueZero for equality comparisons.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @return {Array} The new array of combined values.
 *
 * @example
 * union([2], [1, 2]); // [2, 1]
 */
export const union = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.some(array => !isArray(array))) {
    return [];
  }

  const result: T[] = [];
  for (const array of arrays) {
    for (const value of array) {
      if (!includesSameValueZero(result, value)) {
        result.push(value);
      }
    }
  }

  return result;
};
