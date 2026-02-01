import {
  eq,
  isArray,
} from "../lang";

/**
 * Creates an array excluding all given values using SameValueZero comparisons.
 *
 * @param {Array} array - The array to inspect.
 * @param {...*} values - The values to exclude.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * without([2, 1, 2, 3], 1, 2); // [3]
 */
export const without = <T>(array: T[], ...values: unknown[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (values.length === 0) {
    return array.slice();
  }

  return array.filter(item => !values.some(value => eq(item, value)));
};
