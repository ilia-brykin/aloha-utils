import {
  eq,
  isArray,
} from "../lang";
import {
  flattenValues,
} from "./_arrayHelpers.js";

/**
 * Creates an array of array values not included in the other given arrays
 * using SameValueZero for equality comparisons.
 *
 * @param {Array} array - The array to inspect.
 * @param {...Array} values - The values to exclude.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * difference([2, 1], [2, 3]); // [1]
 */
export const difference = <T>(array: T[], ...values: unknown[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  const excludes = flattenValues(values);
  if (excludes.length === 0) {
    return array.slice();
  }

  return array.filter(item => !excludes.some(value => eq(item, value)));
};
