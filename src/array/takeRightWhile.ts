import {
  isArray,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "./_dropWhileHelpers.js";

/**
 * Creates a slice of array with elements taken from the end. Elements are taken
 * until predicate returns falsey.
 *
 * @param {Array} array - The array to query.
 * @param {Function} [predicate] - The predicate invoked per iteration.
 * @return {Array} The slice of array.
 *
 * @example
 * takeRightWhile([1, 2, 0, 3], value => value > 0); // [3]
 */
export const takeRightWhile = <T>(
  array: T[],
  predicate?: DropPredicate,
): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  const test = resolveDropPredicate(predicate);
  let index = array.length - 1;

  while (index >= 0 &&
    test(array[index], index, array)) {
    index -= 1;
  }

  if (index < 0) {
    return array.slice();
  }

  return array.slice(index + 1);
};
