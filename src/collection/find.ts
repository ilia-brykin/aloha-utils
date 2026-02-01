import {
  forEachCollection,
  isCollection,
} from "./_collectionHelpers.js";
import {
  isArrayLike,
  toInteger,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Iterates over elements of collection, returning the first element predicate
 * returns truthy for.
 *
 * @param {Array|Object} collection - The collection to inspect.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @param {number} [fromIndex=0] - The index to search from.
 * @return {*} The matched element, else undefined.
 *
 * @example
 * find([1, 2, 3], value => value > 1); // 2
 */
export const find = (
  collection: unknown,
  predicate?: DropPredicate,
  fromIndex: unknown = 0,
): unknown => {
  if (!isCollection(collection)) {
    return undefined;
  }

  const test = resolveDropPredicate(predicate);
  let result: unknown = undefined;
  let found = false;

  if (isArrayLike(collection)) {
    const length = (collection as ArrayLike<unknown>).length ?? 0;
    let startIndex = toInteger(fromIndex);
    if (startIndex < 0) {
      startIndex = Math.max(length + startIndex, 0);
    }

    for (let index = startIndex; index < length; index += 1) {
      const value = (collection as ArrayLike<unknown>)[index];
      if (test(value, index, collection as unknown as unknown[])) {
        return value;
      }
    }

    return undefined;
  }

  forEachCollection(collection, (value, key, source) => {
    if (found) {
      return;
    }
    if (test(value, key as number, source as unknown as unknown[])) {
      result = value;
      found = true;
    }
  });

  return result;
};
