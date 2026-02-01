import {
  isArrayLike,
  isObject,
} from "../lang";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "./_iterateeHelpers.js";

type Reducer = (
  accumulator: unknown,
  value: unknown,
  key: string | number,
  collection: unknown,
) => unknown;

/**
 * This method is like reduce except that it iterates over elements of collection
 * from right to left.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @param {*} [accumulator] - The initial value.
 * @return {*} The accumulated value.
 *
 * @example
 * reduceRight([[0, 1], [2, 3]], (acc, val) => acc.concat(val), []);
 */
export function reduceRight(
  collection: unknown,
  iteratee?: CollectionIteratee,
  accumulator?: unknown,
): unknown {
  if (collection === null || collection === undefined) {
    return accumulator;
  }

  const reducer = resolveCollectionIteratee(iteratee) as Reducer;
  const hasAccumulator = arguments.length >= 3;
  let result = accumulator;

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<unknown>;
    const length = source.length;
    let index = length - 1;

    if (!hasAccumulator) {
      if (length === 0) {
        return undefined;
      }
      result = source[length - 1];
      index = length - 2;
    }

    for (; index >= 0; index -= 1) {
      result = reducer(result, source[index], index, collection);
    }

    return result;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, unknown>;
    const keys = Object.keys(source);
    let index = keys.length - 1;

    if (!hasAccumulator) {
      if (keys.length === 0) {
        return undefined;
      }
      const lastKey = keys[index];
      result = source[lastKey];
      index -= 1;
    }

    for (; index >= 0; index -= 1) {
      const key = keys[index];
      result = reducer(result, source[key], key, collection);
    }
  }

  return result;
}
