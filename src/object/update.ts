import {
  get,
} from "./get.js";
import {
  set,
} from "./set.js";

type Updater = (value: unknown) => unknown;

/**
 * This method is like set except that it accepts updater to produce the value to set.
 *
 * @param {Object} object - The object to modify.
 * @param {Array|string} path - The path of the property to set.
 * @param {Function} updater - The function to produce the updated value.
 * @return {Object} Returns object.
 *
 * @example
 * const object = { a: [{ b: { c: 3 } }] };
 * update(object, "a[0].b.c", n => n * n);
 */
export const update = (
  object: unknown,
  path: string | Array<string | number>,
  updater: Updater,
): unknown => {
  const value = get(object, path);
  const nextValue = updater(value);
  return set(object, path, nextValue);
};
