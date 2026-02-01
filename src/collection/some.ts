import {
  isArrayLike,
  isObject,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Checks if predicate returns truthy for any element of collection.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @return {boolean} Returns true if any element passes the predicate check.
 *
 * @example
 * some([null, 0, "yes"], Boolean); // true
 */
export const some = (
  collection: unknown,
  predicate?: DropPredicate,
): boolean => {
  if (collection === null || collection === undefined) {
    return false;
  }

  const test = resolveDropPredicate(predicate);

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<unknown>;
    for (let index = 0; index < source.length; index += 1) {
      if (test(source[index], index, collection as unknown as unknown[])) {
        return true;
      }
    }
    return false;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, unknown>;
    for (const key of Object.keys(source)) {
      if (test(source[key], key as unknown as number, collection as unknown as unknown[])) {
        return true;
      }
    }
  }

  return false;
};
