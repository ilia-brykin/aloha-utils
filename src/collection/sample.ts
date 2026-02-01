import {
  valuesOfCollection,
} from "./_values.js";

/**
 * Gets a random element from collection.
 *
 * @param {Array|Object} collection - The collection to sample.
 * @return {*} The random element.
 *
 * @example
 * sample([1, 2, 3, 4]); // => 2
 */
export const sample = (collection: unknown): unknown => {
  const values = valuesOfCollection(collection);
  if (values.length === 0) {
    return undefined;
  }

  const index = Math.floor(Math.random() * values.length);
  return values[index];
};
