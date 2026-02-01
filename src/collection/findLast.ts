import {
  forEachCollectionRight,
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
 * This method is like find except that it iterates over elements of collection
 * from right to left.
 *
 * @param {Array|Object} collection - The collection to inspect.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @param {number} [fromIndex=collection.length-1] - The index to search from.
 * @return {*} The matched element, else undefined.
 *
 * @example
 * findLast([1, 2, 3, 4], value => value % 2 === 1); // 3
 */
export const findLast = (
  collection: unknown,
  predicate?: DropPredicate,
  fromIndex?: unknown,
): unknown => {
  if (!isCollection(collection)) {
    return undefined;
  }

  const test = resolveDropPredicate(predicate);
  let result: unknown = undefined;
  let found = false;

  if (isArrayLike(collection)) {
    const length = (collection as ArrayLike<unknown>).length ?? 0;
    let startIndex = fromIndex === undefined ?
      length - 1 :
      toInteger(fromIndex);

    if (startIndex < 0) {
      startIndex = length + startIndex;
    }

    if (startIndex >= length) {
      startIndex = length - 1;
    }

    for (let index = startIndex; index >= 0; index -= 1) {
      const value = (collection as ArrayLike<unknown>)[index];
      if (test(value, index, collection as unknown as unknown[])) {
        return value;
      }
    }

    return undefined;
  }

  forEachCollectionRight(collection, (value, key, source) => {
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
