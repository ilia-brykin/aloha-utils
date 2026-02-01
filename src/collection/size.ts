import {
  isArrayLike,
  isObject,
  isString,
} from "../lang";

/**
 * Gets the size of collection.
 *
 * @param {Array|Object|string} collection - The collection to inspect.
 * @return {number} The collection size.
 *
 * @example
 * size([1, 2, 3]); // 3
 */
export const size = (collection: unknown): number => {
  if (collection === null || collection === undefined) {
    return 0;
  }

  if (isString(collection)) {
    return collection.length;
  }

  if (isArrayLike(collection)) {
    return collection.length;
  }

  if (isObject(collection)) {
    return Object.keys(collection as Record<string, unknown>).length;
  }

  return 0;
};
