import {
  isObject,
} from "../lang";
import {
  resolveCollectionIteratee,
  type CollectionIteratee,
} from "../collection/_iterateeHelpers.js";

/**
 * This method is like forIn except that it iterates over properties of object in
 * the opposite order.
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
 * forInRight(new Foo(), (value, key) => key); // returns object
 */
export const forInRight = (
  object: unknown,
  iteratee?: CollectionIteratee,
): unknown => {
  if (!isObject(object)) {
    return object;
  }

  const target = object as Record<string, unknown>;
  const cb = resolveCollectionIteratee(iteratee);
  const keys: string[] = [];

  for (const key in target) {
    keys.push(key);
  }

  for (let i = keys.length - 1; i >= 0; i -= 1) {
    const key = keys[i];
    if (cb(target[key], key, object) === false) {
      break;
    }
  }

  return object;
};
