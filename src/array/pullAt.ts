import {
  isArray,
  toInteger,
} from "../lang";

const normalizeIndexes = (indexes: Array<number | number[]>): number[] => {
  const result: number[] = [];
  for (const index of indexes) {
    if (isArray(index)) {
      for (const inner of index) {
        result.push(toInteger(inner));
      }
    } else {
      result.push(toInteger(index));
    }
  }
  return result;
};

/**
 * Removes elements from array corresponding to indexes and returns an array of removed elements.
 * This method mutates array.
 *
 * @param {Array} array - The array to modify.
 * @param {...(number|number[])} indexes - The indexes of elements to remove.
 * @return {Array} The new array of removed elements.
 *
 * @example
 * const array = ["a", "b", "c", "d"];
 * const pulled = pullAt(array, [1, 3]);
 * // array => ["a", "c"]
 * // pulled => ["b", "d"]
 */
export const pullAt = <T>(
  array: T[],
  ...indexes: Array<number | number[]>
): T[] => {
  if (!isArray(array) || indexes.length === 0) {
    return [];
  }

  const normalized = normalizeIndexes(indexes);
  if (normalized.length === 0) {
    return [];
  }

  const removed = normalized.map(index => array[index]);

  const uniqueSorted = Array.from(new Set(normalized))
    .filter(index => index >= 0 && index < array.length)
    .sort((a, b) => b - a);

  for (const index of uniqueSorted) {
    array.splice(index, 1);
  }

  return removed;
};
