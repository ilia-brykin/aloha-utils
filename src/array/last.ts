import {
  isArray,
} from "../lang";

/**
 * Gets the last element of array.
 *
 * @param {Array} array - The array to query.
 * @return {*} The last element or undefined.
 *
 * @example
 * last([1, 2, 3]); // 3
 */
export const last = <T>(array: T[]): T | undefined => {
  if (!isArray(array)) {
    return undefined;
  }

  return array[array.length - 1];
};
