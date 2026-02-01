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
 * This method is like flatMap except that it recursively flattens the mapped results.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @return {Array} The new flattened array.
 *
 * @example
 * flatMapDeep([1, 2], n => [[[n, n]]]); // [1, 1, 2, 2]
 */
export const flatMapDeep = (
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

  return flattenDepthInternal(mapped, Number.POSITIVE_INFINITY);
};
