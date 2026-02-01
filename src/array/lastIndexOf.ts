import {
  eq,
  isArray,
  toInteger,
} from "../lang";

/**
 * Gets the index at which the last occurrence of value is found in array.
 *
 * @param {Array} array - The array to inspect.
 * @param {*} value - The value to search for.
 * @param {number} [fromIndex=array.length-1] - The index to search from.
 * @return {number} The index of the matched value, else -1.
 *
 * @example
 * lastIndexOf([1, 2, 1, 2], 2); // 3
 */
export const lastIndexOf = <T>(
  array: T[],
  value: unknown,
  fromIndex?: unknown,
): number => {
  if (!isArray(array)) {
    return -1;
  }

  const length = array.length;
  if (length === 0) {
    return -1;
  }

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
    if (eq(array[index], value)) {
      return index;
    }
  }

  return -1;
};
