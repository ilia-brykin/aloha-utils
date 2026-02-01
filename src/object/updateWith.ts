import {
  get,
} from "./get.js";
import {
  setWith,
} from "./setWith.js";

type Updater = (value: unknown) => unknown;
type UpdateCustomizer = (nsValue: unknown, key: string | number, nsObject: unknown) => unknown;

/**
 * This method is like update except that it accepts customizer which is invoked
 * to produce the objects of path.
 *
 * @param {Object} object - The object to modify.
 * @param {Array|string} path - The path of the property to set.
 * @param {Function} updater - The function to produce the updated value.
 * @param {Function} [customizer] - The function to customize assigned values.
 * @return {Object} Returns object.
 *
 * @example
 * const object = {};
 * updateWith(object, "[0][1]", () => "a", Object);
 * // => { "0": { "1": "a" } }
 */
export const updateWith = (
  object: unknown,
  path: string | Array<string | number>,
  updater: Updater,
  customizer?: UpdateCustomizer,
): unknown => {
  const value = get(object, path);
  const nextValue = updater(value);
  return setWith(object, path, nextValue, customizer);
};
