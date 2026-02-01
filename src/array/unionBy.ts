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
 * This method is like union except that it accepts iteratee which is invoked for
 * each element of each arrays to generate the criterion by which uniqueness is computed.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {Array} The new array of combined values.
 *
 * @example
 * unionBy([2.1], [1.2, 2.3], Math.floor); // [2.1, 1.2]
 */
export function unionBy<T>(
  arrays: T[][],
  iteratee?: ArrayIteratee,
): T[] {
  const arraysAndIteratee = Array.from(arguments) as Array<T[] | ArrayIteratee>;
  if (arraysAndIteratee.length === 0) {
    return [];
  }

  let resolvedIteratee: ArrayIteratee | undefined;
  let resolvedArrays: T[][] = arraysAndIteratee as T[][];

  const last = arraysAndIteratee[arraysAndIteratee.length - 1];
  if (!isArray(last)) {
    resolvedIteratee = last as ArrayIteratee;
    resolvedArrays = arraysAndIteratee.slice(0, -1) as T[][];
  }

  if (resolvedArrays.length === 0) {
    return [];
  }

  if (resolvedArrays.some(array => !isArray(array))) {
    return [];
  }

  const mapper = resolveArrayIteratee(resolvedIteratee);
  const seen: unknown[] = [];
  const result: T[] = [];

  for (const array of resolvedArrays) {
    for (const value of array) {
      const criterion = mapper(value);
      if (!includesSameValueZero(seen, criterion)) {
        seen.push(criterion);
        result.push(value);
      }
    }
  }

  return result;
}
