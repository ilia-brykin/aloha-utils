import {
  baseSortedIndex,
} from "./_sortedHelpers.js";
import {
  isArray,
} from "../lang";
import {
  resolveArrayIteratee,
  type ArrayIteratee,
} from "./_iterateeHelpers.js";

/**
 * This method is like sortedIndex except that it accepts iteratee which is
 * invoked for value and each element of array to compute their sort ranking.
 *
 * @param {Array} array - The sorted array to inspect.
 * @param {*} value - The value to evaluate.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {number} The index at which value should be inserted into array.
 *
 * @example
 * sortedIndexBy([{ x: 4 }, { x: 5 }], { x: 4 }, o => o.x); // 0
 */
export const sortedIndexBy = <T>(
  array: T[],
  value: T,
  iteratee?: ArrayIteratee,
): number => {
  if (!isArray(array)) {
    return 0;
  }

  const mapper = resolveArrayIteratee(iteratee);
  return baseSortedIndex(array, value, mapper, false);
};
