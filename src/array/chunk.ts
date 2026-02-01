import {
  isArray,
  toInteger,
} from "../lang";

/**
 * Creates an array of elements split into groups the length of size.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 *
 * @param {Array} array - The array to process.
 * @param {number} [size=1] - The length of each chunk.
 * @return {Array} The array of chunks.
 *
 * @example
 * chunk(["a", "b", "c", "d"], 2); // [["a", "b"], ["c", "d"]]
 * chunk(["a", "b", "c", "d"], 3); // [["a", "b", "c"], ["d"]]
 */
export const chunk = <T>(array: T[], size: unknown = 1): T[][] => {
  if (!isArray(array)) {
    return [];
  }

  const length = array.length;
  if (length === 0) {
    return [];
  }

  const chunkSize = toInteger(size);
  if (chunkSize < 1) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }

  return result;
};
