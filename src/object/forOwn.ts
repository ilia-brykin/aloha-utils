import {
  isObject,
} from "../lang";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "../collection/_iterateeHelpers.js";

/**
 * Iterates over own enumerable string keyed properties of an object and invokes
 * iteratee for each property. Iteratee may exit early by returning false.
 *
 * @param {Object} object - The object to iterate over.
 * @param {Function} [iteratee] - The function invoked per iteration.
 * @return {Object} Returns object.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * Foo.prototype.b = 2;
 * forOwn(new Foo(), (value, key) => key); // returns object
 */
export const forOwn = (
  object: unknown,
  iteratee?: CollectionIteratee,
): unknown => {
  if (!isObject(object)) {
    return object;
  }

  const target = object as Record<string, unknown>;
  const cb = resolveCollectionIteratee(iteratee);
  const keys = Object.keys(target);

  for (const key of keys) {
    if (cb(target[key], key, object) === false) {
      break;
    }
  }

  return object;
};
