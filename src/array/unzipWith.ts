import {
  isArray,
  isFunction,
} from "../lang";
import {
  unzip,
} from "./unzip.js";

/**
 * This method is like unzip except that it accepts iteratee to specify how
 * regrouped values should be combined.
 *
 * @param {Array} array - The array of grouped elements to process.
 * @param {Function} [iteratee] - The function to combine regrouped values.
 * @return {Array} The new array of regrouped elements.
 *
 * @example
 * unzipWith([[1, 10], [2, 20]], (a, b) => a + b); // [3, 30]
 */
export const unzipWith = <T>(
  array: T[][],
  iteratee?: (...values: T[]) => unknown,
): unknown[] => {
  if (!isArray(array)) {
    return [];
  }

  if (!isFunction(iteratee)) {
    return unzip(array);
  }

  return unzip(array).map(group => iteratee(...group));
};
