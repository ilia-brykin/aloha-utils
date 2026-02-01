import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Gets the element at index n of array. If n is negative, the nth element from
 * the end is returned.
 *
 * @param {Array} array - The array to query.
 * @param {number} [n=0] - The index of the element to return.
 * @return {*} The nth element of array.
 *
 * @example
 * const array = ["a", "b", "c", "d"];
 * nth(array, 1); // "b"
 * nth(array, -2); // "c"
 */
export const nth = <T>(array: T[], n: unknown = 0): T | undefined => {
  if (!isArray(array)) {
    return undefined;
  }

  const length = array.length;
  if (length === 0) {
    return undefined;
  }

  let index = toInteger(n);
  if (index < 0) {
    index = length + index;
  }

  if (index < 0 || index >= length) {
    return undefined;
  }

  return array[index];
};
