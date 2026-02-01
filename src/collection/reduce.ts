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
 * Reduces collection to a value which is the accumulated result of running each
 * element of collection thru iteratee.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @param {*} [accumulator] - The initial value.
 * @return {*} The accumulated value.
 *
 * @example
 * reduce([1, 2], (sum, n) => sum + n, 0); // 3
 */
export function reduce(
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
    let index = 0;

    if (!hasAccumulator) {
      if (length === 0) {
        return undefined;
      }
      result = source[0];
      index = 1;
    }

    for (; index < length; index += 1) {
      result = reducer(result, source[index], index, collection);
    }

    return result;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, unknown>;
    const keys = Object.keys(source);
    let index = 0;

    if (!hasAccumulator) {
      if (keys.length === 0) {
        return undefined;
      }
      const firstKey = keys[0];
      result = source[firstKey];
      index = 1;
    }

    for (; index < keys.length; index += 1) {
      const key = keys[index];
      result = reducer(result, source[key], key, collection);
    }
  }

  return result;
}
