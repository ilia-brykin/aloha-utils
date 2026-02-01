import {
  isArray,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "./_dropWhileHelpers.js";

/**
 * Creates a slice of array excluding elements dropped from the beginning.
 * Elements are dropped until predicate returns falsey.
 *
 * @param {Array} array - The array to query.
 * @param {Function} [predicate] - The predicate invoked per element.
 * @return {Array} The slice of array.
 *
 * @example
 * dropWhile([1, 2, 0, 3]); // [0, 3]
 */
export const dropWhile = <T>(
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

  return array.slice(index);
};
