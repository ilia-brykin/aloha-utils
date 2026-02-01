import {
  eq,
  isArray,
} from "../lang";

/**
 * This method is like pull except that it accepts an array of values to remove.
 * This method mutates array.
 *
 * @param {Array} array - The array to modify.
 * @param {Array} values - The values to remove.
 * @return {Array} Returns array.
 *
 * @example
 * const array = ["a", "b", "c", "a", "b", "c"];
 * pullAll(array, ["a", "c"]);
 * // array => ["b", "b"]
 */
export const pullAll = <T>(array: T[], values: unknown[]): T[] => {
  if (!isArray(array) || !isArray(values) || values.length === 0) {
    return array;
  }

  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (values.some(value => eq(array[i], value))) {
      array.splice(i, 1);
    }
  }

  return array;
};
