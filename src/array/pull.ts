import {
  eq,
  isArray,
} from "../lang";

/**
 * Removes all given values from array using SameValueZero for equality comparisons.
 * This method mutates array.
 *
 * @param {Array} array - The array to modify.
 * @param {...*} values - The values to remove.
 * @return {Array} Returns array.
 *
 * @example
 * const array = ["a", "b", "c", "a", "b", "c"];
 * pull(array, "a", "c");
 * // array => ["b", "b"]
 */
export const pull = <T>(array: T[], ...values: unknown[]): T[] => {
  if (!isArray(array) || values.length === 0) {
    return array;
  }

  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (values.some(value => eq(array[i], value))) {
      array.splice(i, 1);
    }
  }

  return array;
};
