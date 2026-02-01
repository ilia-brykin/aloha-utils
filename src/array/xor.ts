import {
  includesSameValueZero,
} from "./_compareHelpers.js";
import {
  isArray,
} from "../lang";

const uniqueBySameValueZero = <T>(array: T[]): T[] => {
  const result: T[] = [];
  for (const value of array) {
    if (!includesSameValueZero(result, value)) {
      result.push(value);
    }
  }
  return result;
};

/**
 * Creates an array of unique values that is the symmetric difference of the given arrays.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * xor([2, 1], [2, 3]); // [1, 3]
 */
export const xor = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) {
    return [];
  }

  if (arrays.some(array => !isArray(array))) {
    return [];
  }

  const result: T[] = [];
  for (const array of arrays) {
    const uniqueArray = uniqueBySameValueZero(array);
    for (const value of uniqueArray) {
      const index = result.findIndex(item => includesSameValueZero([item], value));
      if (index === -1) {
        result.push(value);
      } else {
        result.splice(index, 1);
      }
    }
  }

  return result;
};
