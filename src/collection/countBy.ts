import {
  isArrayLike,
  isObject,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Creates an object composed of keys generated from the results of running each
 * element of collection thru iteratee. The corresponding value of each key is
 * the number of times the key was returned by iteratee.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The iteratee to transform keys.
 * @return {Object} The composed aggregate object.
 *
 * @example
 * countBy([6.1, 4.2, 6.3], Math.floor); // { "4": 1, "6": 2 }
 */
export const countBy = (
  collection: unknown,
  iteratee?: DropPredicate,
): Record<string, number> => {
  if (collection === null || collection === undefined) {
    return {};
  }

  const result: Record<string, number> = {};
  const transform = resolveDropPredicate(iteratee);

  if (isArrayLike(collection)) {
    const length = collection.length;
    const source = collection as ArrayLike<unknown>;
    for (let index = 0; index < length; index += 1) {
      const key = String(transform(source[index], index, collection as unknown[]));
      result[key] = (result[key] ?? 0) + 1;
    }
    return result;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, unknown>;
    for (const key of Object.keys(source)) {
      const value = source[key];
      const countKey = String(transform(value, key as unknown as number, collection as unknown as unknown[]));
      result[countKey] = (result[countKey] ?? 0) + 1;
    }
  }

  return result;
};
