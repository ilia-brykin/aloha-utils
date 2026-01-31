import {
  cloneBase,
} from "./_cloneBase.js";

/**
 * Creates a deep clone of value.
 *
 * Note: This method is loosely based on the structured clone algorithm and
 * supports cloning arrays, array buffers, booleans, date objects, maps,
 * numbers, Object objects, regexes, sets, strings, symbols, and typed arrays.
 * The own enumerable properties of arguments objects are cloned as plain
 * objects. An empty object is returned for uncloneable values such as error
 * objects, functions, DOM nodes, and WeakMaps.
 *
 * @param {*} value - The value to clone.
 * @return {*} Returns the deep cloned value.
 *
 * @example
 * const objects = [{ a: 1 }, { b: 2 }];
 * const deep = cloneDeep(objects);
 * deep[0] === objects[0]; // false
 */
export const cloneDeep = (value: unknown): unknown => {
  return cloneBase(value, { deep: true });
};
