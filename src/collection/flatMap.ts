import {
  flattenDepthInternal,
} from "../array/_flattenHelpers.js";
import {
  forEachCollection,
  isCollection,
} from "./_collectionHelpers.js";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Creates a flattened array of values by running each element in collection thru
 * iteratee and flattening the mapped results.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @return {Array} The new flattened array.
 *
 * @example
 * flatMap([1, 2], n => [n, n]); // [1, 1, 2, 2]
 */
export const flatMap = (
  collection: unknown,
  iteratee?: DropPredicate,
): unknown[] => {
  if (!isCollection(collection)) {
    return [];
  }

  const mapper = resolveDropPredicate(iteratee);
  const mapped: unknown[] = [];

  forEachCollection(collection, (value, key, source) => {
    mapped.push(mapper(value, key as number, source as unknown as unknown[]));
  });

  return flattenDepthInternal(mapped, 1);
};
