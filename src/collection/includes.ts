import {
  eq,
  isArrayLike,
  isObject,
  isString,
  toInteger,
} from "../lang";

/**
 * Checks if value is in collection. If collection is a string, it's checked for
 * a substring of value, otherwise SameValueZero is used for equality comparisons.
 *
 * @param {Array|Object|string} collection - The collection to inspect.
 * @param {*} value - The value to search for.
 * @param {number} [fromIndex=0] - The index to search from.
 * @return {boolean} Returns true if value is found, else false.
 *
 * @example
 * includes([1, 2, 3], 1); // true
 */
export const includes = (
  collection: unknown,
  value: unknown,
  fromIndex: unknown = 0,
): boolean => {
  if (collection === null || collection === undefined) {
    return false;
  }

  if (isString(collection)) {
    const stringValue = collection;
    const length = stringValue.length;
    let startIndex = toInteger(fromIndex);
    if (startIndex < 0) {
      startIndex = Math.max(length + startIndex, 0);
    }
    return stringValue.indexOf(String(value), startIndex) !== -1;
  }

  if (isArrayLike(collection)) {
    const source = collection as ArrayLike<unknown>;
    const length = source.length;
    let startIndex = toInteger(fromIndex);
    if (startIndex < 0) {
      startIndex = Math.max(length + startIndex, 0);
    }
    for (let index = startIndex; index < length; index += 1) {
      if (eq(source[index], value)) {
        return true;
      }
    }
    return false;
  }

  if (isObject(collection)) {
    const source = collection as Record<string, unknown>;
    for (const key of Object.keys(source)) {
      if (eq(source[key], value)) {
        return true;
      }
    }
  }

  return false;
};
