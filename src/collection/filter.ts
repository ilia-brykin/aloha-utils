import {
  forEachCollection,
  isCollection,
} from "./_collectionHelpers.js";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Iterates over elements of collection, returning an array of all elements
 * predicate returns truthy for.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @return {Array} The new filtered array.
 *
 * @example
 * filter([1, 2, 3], value => value > 1); // [2, 3]
 */
export const filter = (
  collection: unknown,
  predicate?: DropPredicate,
): unknown[] => {
  if (!isCollection(collection)) {
    return [];
  }

  const test = resolveDropPredicate(predicate);
  const result: unknown[] = [];

  forEachCollection(collection, (value, key, source) => {
    if (test(value, key as number, source as unknown as unknown[])) {
      result.push(value);
    }
  });

  return result;
};
