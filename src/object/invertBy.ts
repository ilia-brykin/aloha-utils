import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "../collection/_iterateeHelpers.js";

/**
 * This method is like invert except that the inverted object is generated from
 * the results of running each element of object thru iteratee.
 *
 * @param {Object} object - The object to invert.
 * @param {Function} [iteratee] - The iteratee invoked per element.
 * @return {Object} Returns the new inverted object.
 *
 * @example
 * invertBy({ a: 1, b: 2, c: 1 }); // { "1": ["a", "c"], "2": ["b"] }
 */
export const invertBy = (
  object: unknown,
  iteratee?: CollectionIteratee,
): Record<string, string[]> => {
  const target = Object(object) as Record<string, unknown>;
  const result: Record<string, string[]> = {};
  const keys = Object.keys(target);
  const mapper = resolveCollectionIteratee(iteratee);

  for (const key of keys) {
    const value = mapper(target[key], key, object);
    const groupKey = String(value);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(key);
  }

  return result;
};
