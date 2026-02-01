import {
  eq,
  isArray,
  toInteger,
} from "../lang";

/**
 * Gets the index at which the first occurrence of value is found in array.
 *
 * @param {Array} array - The array to inspect.
 * @param {*} value - The value to search for.
 * @param {number} [fromIndex=0] - The index to search from.
 * @return {number} The index of the matched value, else -1.
 *
 * @example
 * indexOf([1, 2, 1, 2], 2); // 1
 */
export const indexOf = <T>(
  array: T[],
  value: unknown,
  fromIndex: unknown = 0,
): number => {
  if (!isArray(array)) {
    return -1;
  }

  const length = array.length;
  if (length === 0) {
    return -1;
  }

  let startIndex = toInteger(fromIndex);
  if (startIndex < 0) {
    startIndex = Math.max(length + startIndex, 0);
  }

  for (let index = startIndex; index < length; index += 1) {
    if (eq(array[index], value)) {
      return index;
    }
  }

  return -1;
};
