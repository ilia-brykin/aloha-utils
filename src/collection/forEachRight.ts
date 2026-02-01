import {
  isArrayLike,
  isObject,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * This method is like forEach except that it iterates over elements of collection
 * from right to left.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @return {*} Returns collection.
 *
 * @example
 * forEachRight([1, 2], value => console.log(value));
 */
export const forEachRight = <T>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee?: DropPredicate,
): T[] | Record<string, T> | null | undefined => {
  if (collection === null || collection === undefined) {
    return collection;
  }

  const iterate = resolveDropPredicate(iteratee);

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<T>;
    for (let index = source.length - 1; index >= 0; index -= 1) {
      if (iterate(source[index], index, collection as unknown[]) === false) {
        break;
      }
    }
    return collection;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, T>;
    const keys = Object.keys(source);
    for (let i = keys.length - 1; i >= 0; i -= 1) {
      const key = keys[i];
      if (iterate(source[key], key as unknown as number, collection as unknown as unknown[]) === false) {
        break;
      }
    }
  }

  return collection;
};
