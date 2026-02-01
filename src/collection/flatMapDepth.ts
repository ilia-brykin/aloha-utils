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
import {
  toInteger,
} from "../lang";

/**
 * This method is like flatMap except that it recursively flattens the mapped
 * results up to depth times.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @param {number} [depth=1] - The maximum recursion depth.
 * @return {Array} The new flattened array.
 *
 * @example
 * flatMapDepth([1, 2], n => [[[n, n]]], 2); // [[1, 1], [2, 2]]
 */
export const flatMapDepth = (
  collection: unknown,
  iteratee?: DropPredicate,
  depth: unknown = 1,
): unknown[] => {
  if (!isCollection(collection)) {
    return [];
  }

  const mapper = resolveDropPredicate(iteratee);
  const mapped: unknown[] = [];

  forEachCollection(collection, (value, key, source) => {
    mapped.push(mapper(value, key as number, source as unknown as unknown[]));
  });

  const resolvedDepth = toInteger(depth);
  return flattenDepthInternal(mapped, resolvedDepth);
};
