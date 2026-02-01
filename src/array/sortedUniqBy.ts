import {
  eq,
  isArray,
} from "../lang";
import {
  resolveArrayIteratee,
  type ArrayIteratee,
} from "./_iterateeHelpers.js";

/**
 * This method is like uniqBy except that it's designed and optimized for sorted arrays.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {Array} The new duplicate free array.
 *
 * @example
 * sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor); // [1.1, 2.3]
 */
export const sortedUniqBy = <T>(
  array: T[],
  iteratee?: ArrayIteratee,
): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  const mapper = resolveArrayIteratee(iteratee);
  const result: T[] = [];
  let prevComputed: unknown;
  let hasPrev = false;

  for (const value of array) {
    const computed = mapper(value);
    if (!hasPrev || !eq(computed, prevComputed)) {
      result.push(value);
      prevComputed = computed;
      hasPrev = true;
    }
  }

  return result;
};
