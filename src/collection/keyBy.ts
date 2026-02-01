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
 * element of collection thru iteratee. The corresponding value of each key is
 * the last element responsible for generating the key.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The iteratee to transform keys.
 * @return {Object} The composed object.
 *
 * @example
 * keyBy([{ dir: "left" }, { dir: "right" }], "dir");
 */
export const keyBy = (
  collection: unknown,
  iteratee?: CollectionIteratee,
): Record<string, unknown> => {
  if (!isCollection(collection)) {
    return {};
  }

  const result: Record<string, unknown> = {};
  const mapper = resolveCollectionIteratee(iteratee);

  forEachCollectionValue(collection, (value, key, source) => {
    const resultKey = String(mapper(value, key, source));
    result[resultKey] = value;
  });

  return result;
};
