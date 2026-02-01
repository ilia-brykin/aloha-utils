import {
  filter,
} from "./filter.js";
import {
  resolveDropPredicate,
  type DropPredicate,
} from "../array/_dropWhileHelpers.js";

/**
 * The opposite of filter; returns elements predicate does not return truthy for.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Function} [predicate] - The function invoked per iteration.
 * @return {Array} The new filtered array.
 *
 * @example
 * reject([1, 2, 3], n => n > 1); // [1]
 */
export const reject = (
  collection: unknown,
  predicate?: DropPredicate,
): unknown[] => {
  const test = resolveDropPredicate(predicate);
  return filter(collection, (value, key, source) => {
    return !test(value, key as number, source as unknown as unknown[]);
  });
};
