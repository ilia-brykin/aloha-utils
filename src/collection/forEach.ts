import {
  isArrayLike,
  isObject,
} from "../lang";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * Iterates over elements of collection and invokes iteratee for each element.
 * Iteratee functions may exit iteration early by explicitly returning false.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @return {*} Returns collection.
 *
 * @example
 * forEach([1, 2], value => console.log(value));
 */
export const forEach = <T>(
  collection: T[] | Record<string, T> | null | undefined,
  iteratee?: DropPredicate,
): T[] | Record<string, T> | null | undefined => {
  if (collection === null || collection === undefined) {
    return collection;
  }

  const iterate = resolveDropPredicate(iteratee);

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<T>;
    for (let index = 0; index < source.length; index += 1) {
      if (iterate(source[index], index, collection as unknown[]) === false) {
        break;
      }
    }
    return collection;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, T>;
    for (const key of Object.keys(source)) {
      if (iterate(source[key], key as unknown as number, collection as unknown as unknown[]) === false) {
        break;
      }
    }
  }

  return collection;
};
