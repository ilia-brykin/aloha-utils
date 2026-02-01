import {
  isArray,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "./_dropWhileHelpers.js";

/**
 * Removes all elements from array that predicate returns truthy for and returns
 * an array of the removed elements.
 *
 * @param {Array} array - The array to modify.
 * @param {Function} [predicate] - The predicate invoked per iteration.
 * @return {Array} The array of removed elements.
 *
 * @example
 * const array = [1, 2, 3, 4];
 * const evens = remove(array, n => n % 2 === 0);
 * // array => [1, 3]
 * // evens => [2, 4]
 */
export const remove = <T>(
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
  const removed: T[] = [];

  for (let index = 0; index < array.length; ) {
    if (test(array[index], index, array)) {
      removed.push(array[index]);
      array.splice(index, 1);
    } else {
      index += 1;
    }
  }

  return removed;
};
