import {
  isObject,
} from "../lang";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "../collection/_iterateeHelpers.js";

/**
 * This method is like findKey except that it iterates over elements of a
 * collection in the opposite order.
 *
 * @param {Object} object - The object to inspect.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @return {*} The key of the matched element, else undefined.
 *
 * @example
 * const users = {
 *   barney: { age: 36, active: true },
 *   fred: { age: 40, active: false },
 *   pebbles: { age: 1, active: true },
 * };
 *
 * findLastKey(users, "active"); // "pebbles"
 */
export const findLastKey = (
  object: unknown,
  predicate?: CollectionIteratee,
): string | undefined => {
  if (!isObject(object)) {
    return undefined;
  }

  const source = object as Record<string, unknown>;
  const keys = Object.keys(source);
  const test = resolveCollectionIteratee(predicate);

  for (let i = keys.length - 1; i >= 0; i -= 1) {
    const key = keys[i];
    if (test(source[key], key, object)) {
      return key;
    }
  }

  return undefined;
};
