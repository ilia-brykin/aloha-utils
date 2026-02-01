import {
  isArray,
} from "../lang";

/**
 * Gets the first element of array.
 *
 * @param {Array} array - The array to query.
 * @return {*} The first element or undefined.
 *
 * @example
 * first([1, 2, 3]); // 1
 */
export const first = <T>(array: T[]): T | undefined => {
  if (!isArray(array)) {
    return undefined;
  }

  return array[0];
};
