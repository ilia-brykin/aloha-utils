import {
  forIn,
} from "./forIn.js";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "../collection/_iterateeHelpers.js";

/**
 * Creates an object composed of the object properties predicate returns truthy for.
 *
 * @param {Object} object - The source object.
 * @param {Function} [predicate] - The function invoked per property.
 * @return {Object} Returns the new object.
 *
 * @example
 * pickBy({ a: 1, b: "2", c: 3 }, value => typeof value === "number");
 * // => { a: 1, c: 3 }
 */
export const pickBy = (
  object: unknown,
  predicate?: CollectionIteratee,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const test = resolveCollectionIteratee(predicate);

  forIn(object, (value, key) => {
    if (test(value, key, object)) {
      result[key as string] = value;
    }
  });

  return result;
};
