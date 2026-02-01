import {
  get,
} from "./get.js";

type Path = string | Array<string | number>;

/**
 * Creates an array of values corresponding to paths of object.
 *
 * @param {Object} object - The object to iterate over.
 * @param {...(string|string[])} [paths] - The property paths to pick.
 * @return {Array} Returns the picked values.
 *
 * @example
 * const object = { a: [{ b: { c: 3 } }, 4] };
 * at(object, ["a[0].b.c", "a[1]"]); // [3, 4]
 */
export const at = (
  object: unknown,
  ...paths: Array<Path | Array<Path>>
): unknown[] => {
  if (paths.length === 0) {
    return [];
  }

  const normalized = paths.length === 1 && Array.isArray(paths[0])
    ? (paths[0] as Array<Path>)
    : (paths as Array<Path>);

  return normalized.map(path => get(object, path as Path));
};
