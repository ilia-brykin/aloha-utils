import {
  isArray,
} from "../lang";

/**
 * Reverses array so that the first element becomes the last.
 *
 * @param {Array} array - The array to modify.
 * @return {Array} Returns array.
 *
 * @example
 * const array = [1, 2, 3];
 * reverse(array); // [3, 2, 1]
 */
export const reverse = <T>(array: T[]): T[] => {
  if (!isArray(array)) {
    return array;
  }

  return array.reverse();
};
