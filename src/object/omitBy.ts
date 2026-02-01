import {
  forIn,
} from "./forIn.js";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "../collection/_iterateeHelpers.js";

/**
 * The opposite of pickBy; creates an object composed of the own and inherited
 * enumerable string keyed properties of object that predicate doesn't return truthy for.
 *
 * @param {Object} object - The source object.
 * @param {Function} [predicate] - The function invoked per property.
 * @return {Object} Returns the new object.
 *
 * @example
 * omitBy({ a: 1, b: "2", c: 3 }, value => typeof value === "number");
 * // => { b: "2" }
 */
export const omitBy = (
  object: unknown,
  predicate?: CollectionIteratee,
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const test = resolveCollectionIteratee(predicate);

  forIn(object, (value, key) => {
    if (!test(value, key, object)) {
      result[key as string] = value;
    }
  });

  return result;
};
