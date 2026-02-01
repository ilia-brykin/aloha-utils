import {
  isArray,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "./_dropWhileHelpers.js";

/**
 * Creates a slice of array with elements taken from the beginning. Elements are
 * taken until predicate returns falsey.
 *
 * @param {Array} array - The array to query.
 * @param {Function} [predicate] - The predicate invoked per iteration.
 * @return {Array} The slice of array.
 *
 * @example
 * takeWhile([1, 2, 0, 3], value => value > 0); // [1, 2]
 */
export const takeWhile = <T>(
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
  let index = 0;

  while (index < array.length &&
    test(array[index], index, array)) {
    index += 1;
  }

  return array.slice(0, index);
};
