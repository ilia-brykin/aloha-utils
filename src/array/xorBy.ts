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

const uniqueByCriterion = <T>(
  array: T[],
  mapper: (value: T) => unknown,
): Array<{ value: T; criterion: unknown }> => {
  const result: Array<{ value: T; criterion: unknown }> = [];
  const seen: unknown[] = [];

  for (const value of array) {
    const criterion = mapper(value);
    if (!includesSameValueZero(seen, criterion)) {
      seen.push(criterion);
      result.push({ value, criterion });
    }
  }

  return result;
};

/**
 * This method is like xor except that it accepts iteratee which is invoked for
 * each element of each arrays to generate the criterion by which they're compared.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * xorBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2, 3.4]
 */
export function xorBy<T>(
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
  const result: T[] = [];
  const resultCriteria: unknown[] = [];

  for (const array of resolvedArrays) {
    const uniquePairs = uniqueByCriterion(array, mapper as (value: T) => unknown);
    for (const { value, criterion } of uniquePairs) {
      const index = resultCriteria.findIndex(item => includesSameValueZero([item], criterion));
      if (index === -1) {
        result.push(value);
        resultCriteria.push(criterion);
      } else {
        result.splice(index, 1);
        resultCriteria.splice(index, 1);
      }
    }
  }

  return result;
}
