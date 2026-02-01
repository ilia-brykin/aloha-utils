import {
  isArrayLike,
  isObject,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Checks if predicate returns truthy for all elements of collection.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [predicate] - The predicate invoked per iteration.
 * @return {boolean} Returns true if all elements pass the predicate check.
 *
 * @example
 * every([true, 1, null, "yes"], Boolean); // false
 */
export const every = (
  collection: unknown,
  predicate?: DropPredicate,
): boolean => {
  if (collection === null || collection === undefined) {
    return true;
  }

  const test = resolveDropPredicate(predicate);

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<unknown>;
    for (let index = 0; index < source.length; index += 1) {
      if (!test(source[index], index, collection as unknown[])) {
        return false;
      }
    }
    return true;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, unknown>;
    for (const key of Object.keys(source)) {
      if (!test(source[key], key as unknown as number, collection as unknown as unknown[])) {
        return false;
      }
    }
  }

  return true;
};
