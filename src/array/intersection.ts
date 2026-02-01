import {
  eq,
  isArray,
} from "../lang";

const includesSameValueZero = (array: unknown[], value: unknown): boolean => {
  return array.some(item => eq(item, value));
};

/**
 * Creates an array of unique values that are included in all given arrays.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @return {Array} The new array of intersecting values.
 *
 * @example
 * intersection([2, 1], [2, 3]); // [2]
 */
export const intersection = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.some(array => !isArray(array))) {
    return [];
  }

  const [first, ...rest] = arrays;
  if (first.length === 0) {
    return [];
  }

  const result: T[] = [];
  for (const value of first) {
    if (includesSameValueZero(result, value)) {
      continue;
    }

    let isInAll = true;
    for (const array of rest) {
      if (!includesSameValueZero(array, value)) {
        isInAll = false;
        break;
      }
    }

    if (isInAll) {
      result.push(value);
    }
  }

  return result;
};
