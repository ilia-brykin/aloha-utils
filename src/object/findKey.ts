import {
  isObject,
} from "../lang";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "../collection/_iterateeHelpers.js";

/**
 * This method is like find except that it returns the key of the first element
 * predicate returns truthy for instead of the element itself.
 *
 * @param {Object} object - The object to inspect.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @return {*} The key of the matched element, else undefined.
 *
 * @example
 * const users = {
 *   barney: { age: 36, active: true },
 *   fred: { age: 40, active: false },
 * };
 *
 * findKey(users, value => value.age < 40); // "barney"
 */
export const findKey = (
  object: unknown,
  predicate?: CollectionIteratee,
): string | undefined => {
  if (!isObject(object)) {
    return undefined;
  }

  const source = object as Record<string, unknown>;
  const keys = Object.keys(source);
  const test = resolveCollectionIteratee(predicate);

  for (const key of keys) {
    if (test(source[key], key, object)) {
      return key;
    }
  }

  return undefined;
};
