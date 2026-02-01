import {
  includesSameValueZero,
} from "./_compareHelpers.js";
import {
  isArray,
} from "../lang";
import {
  resolveArrayIteratee,
  type ArrayIteratee,
} from "./_iterateeHelpers.js";

/**
 * This method is like uniq except that it accepts iteratee which is invoked for
 * each element in array to generate the criterion by which uniqueness is computed.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {Array} The new duplicate free array.
 *
 * @example
 * uniqBy([2.1, 1.2, 2.3], Math.floor); // [2.1, 1.2]
 */
export const uniqBy = <T>(
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
  const seen: unknown[] = [];
  const result: T[] = [];

  for (const value of array) {
    const criterion = mapper(value);
    if (!includesSameValueZero(seen, criterion)) {
      seen.push(criterion);
      result.push(value);
    }
  }

  return result;
};
