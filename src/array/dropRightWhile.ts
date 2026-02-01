import {
  isArray,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "./_dropWhileHelpers.js";

/**
 * Creates a slice of array excluding elements dropped from the end.
 * Elements are dropped until predicate returns falsey.
 *
 * @param {Array} array - The array to query.
 * @param {Function} [predicate] - The predicate invoked per element.
 * @return {Array} The slice of array.
 *
 * @example
 * dropRightWhile([1, 2, 0, 3]); // [1, 2, 0]
 */
export const dropRightWhile = <T>(
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
    return [];
  }

  return array.slice(0, index + 1);
};
