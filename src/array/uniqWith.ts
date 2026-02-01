import {
  includesWith,
} from "./_compareHelpers.js";
import {
  isArray,
} from "../lang";

type Comparator = (arrVal: unknown, othVal: unknown) => unknown;

/**
 * This method is like uniq except that it accepts comparator which is invoked
 * to compare elements of array.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function} [comparator] - The comparator invoked per element.
 * @return {Array} The new duplicate free array.
 *
 * @example
 * const objects = [{ x: 1 }, { x: 2 }, { x: 1 }];
 * uniqWith(objects, (a, b) => a.x === b.x); // [{ x: 1 }, { x: 2 }]
 */
export const uniqWith = <T>(
  array: T[],
  comparator?: Comparator,
): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  const result: T[] = [];
  for (const value of array) {
    if (!includesWith(result as unknown[], value, comparator)) {
      result.push(value);
    }
  }

  return result;
};
