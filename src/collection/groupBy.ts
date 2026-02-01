import {
  forEachCollectionValue,
  isCollection,
} from "./_collectionHelpers.js";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "./_iterateeHelpers.js";

/**
 * Creates an object composed of keys generated from the results of running each
 * element of collection thru iteratee.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The iteratee to transform keys.
 * @return {Object} The composed aggregate object.
 *
 * @example
 * groupBy([6.1, 4.2, 6.3], Math.floor); // { "4": [4.2], "6": [6.1, 6.3] }
 */
export const groupBy = (
  collection: unknown,
  iteratee?: CollectionIteratee,
): Record<string, unknown[]> => {
  if (!isCollection(collection)) {
    return {};
  }

  const result: Record<string, unknown[]> = {};
  const mapper = resolveCollectionIteratee(iteratee);

  forEachCollectionValue(collection, (value, key, source) => {
    const groupKey = String(mapper(value, key, source));
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(value);
  });

  return result;
};
