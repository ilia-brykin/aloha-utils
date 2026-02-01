import {
  toInteger,
} from "../lang";
import {
  valuesOfCollection,
} from "./_values.js";

const shuffleArray = (values: unknown[]): unknown[] => {
  const result = values.slice();
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

/**
 * Gets n random elements at unique keys from collection up to the size of collection.
 *
 * @param {Array|Object} collection - The collection to sample.
 * @param {number} [n=1] - The number of elements to sample.
 * @return {Array} The random elements.
 *
 * @example
 * sampleSize([1, 2, 3], 2); // => [3, 1]
 */
export const sampleSize = (
  collection: unknown,
  n: unknown = 1,
): unknown[] => {
  const values = valuesOfCollection(collection);
  const length = values.length;
  if (length === 0) {
    return [];
  }

  const count = toInteger(n);
  if (count <= 0) {
    return [];
  }

  const shuffled = shuffleArray(values);
  return shuffled.slice(0, Math.min(count, length));
};
