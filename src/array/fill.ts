import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Fills elements of array with value from start up to, but not including, end.
 *
 * @param {Array} array - The array to fill.
 * @param {*} value - The value to fill array with.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @return {Array} The filled array.
 *
 * @example
 * const array = [1, 2, 3];
 * fill(array, "a"); // ["a", "a", "a"]
 */
export const fill = <T>(
  array: T[],
  value: unknown,
  start: unknown = 0,
  end?: unknown,
): T[] => {
  if (!isArray(array)) {
    return array as T[];
  }

  const length = array.length;
  if (length === 0) {
    return array;
  }

  let startIndex = toInteger(start);
  let endIndex = end === undefined ? length : toInteger(end);

  if (startIndex < 0) {
    startIndex = Math.max(length + startIndex, 0);
  }

  if (endIndex < 0) {
    endIndex = Math.max(length + endIndex, 0);
  }

  if (startIndex >= endIndex) {
    return array;
  }

  const finalEnd = Math.min(endIndex, length);
  for (let index = startIndex; index < finalEnd; index += 1) {
    array[index] = value as T;
  }

  return array;
};
