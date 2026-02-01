import {
  eq,
  isArray,
} from "../lang";

/**
 * This method is like uniq except that it's designed and optimized for sorted arrays.
 *
 * @param {Array} array - The array to inspect.
 * @return {Array} The new duplicate free array.
 *
 * @example
 * sortedUniq([1, 1, 2]); // [1, 2]
 */
export const sortedUniq = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  const result: T[] = [];
  let prev: T | undefined;
  let hasPrev = false;

  for (const value of array) {
    if (!hasPrev || !eq(value, prev)) {
      result.push(value);
      prev = value;
      hasPrev = true;
    }
  }

  return result;
};
