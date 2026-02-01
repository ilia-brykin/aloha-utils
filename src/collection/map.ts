import {
  forEachCollectionValue,
  isCollection,
} from "./_collectionHelpers.js";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "./_iterateeHelpers.js";

/**
 * Creates an array of values by running each element in collection thru iteratee.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @return {Array} The new mapped array.
 *
 * @example
 * map([4, 8], n => n * n); // [16, 64]
 */
export const map = (
  collection: unknown,
  iteratee?: CollectionIteratee,
): unknown[] => {
  if (!isCollection(collection)) {
    return [];
  }

  const mapper = resolveCollectionIteratee(iteratee);
  const result: unknown[] = [];

  forEachCollectionValue(collection, (value, key, source) => {
    result.push(mapper(value, key, source));
  });

  return result;
};
