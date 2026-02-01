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
 * Creates an array of shuffled values.
 *
 * @param {Array|Object} collection - The collection to shuffle.
 * @return {Array} The new shuffled array.
 *
 * @example
 * shuffle([1, 2, 3, 4]); // => [4, 1, 3, 2]
 */
export const shuffle = (collection: unknown): unknown[] => {
  return shuffleArray(valuesOfCollection(collection));
};
