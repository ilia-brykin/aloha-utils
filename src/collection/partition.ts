import {
  forEachCollectionValue,
  isCollection,
} from "./_collectionHelpers.js";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Creates an array of elements split into two groups, the first of which contains
 * elements predicate returns truthy for, the second of which contains elements
 * predicate returns falsey for.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @return {Array} The array of grouped elements.
 *
 * @example
 * partition([1, 2, 3], value => value > 1); // [[2, 3], [1]]
 */
export const partition = (
  collection: unknown,
  predicate?: DropPredicate,
): [unknown[], unknown[]] => {
  if (!isCollection(collection)) {
    return [[], []];
  }

  const test = resolveDropPredicate(predicate);
  const truthy: unknown[] = [];
  const falsey: unknown[] = [];

  forEachCollectionValue(collection, (value, key, source) => {
    if (test(value, key as number, source as unknown as unknown[])) {
      truthy.push(value);
    } else {
      falsey.push(value);
    }
  });

  return [truthy, falsey];
};
