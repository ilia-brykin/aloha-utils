import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Creates a slice of array from start up to, but not including, end.
 *
 * @param {Array} array - The array to slice.
 * @param {number} [start=0] - The start position.
 * @param {number} [end=array.length] - The end position.
 * @return {Array} The slice of array.
 *
 * @example
 * slice([1, 2, 3], 1, 3); // [2, 3]
 */
export const slice = <T>(
  array: T[],
  start: unknown = 0,
  end?: unknown,
): T[] => {
  if (!isArray(array)) {
    return [];
  }

  const length = array.length;
  if (length === 0) {
    return [];
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
    return [];
  }

  const result: T[] = [];
  const finalEnd = Math.min(endIndex, length);
  for (let index = startIndex; index < finalEnd; index += 1) {
    result.push(array[index]);
  }

  return result;
};
