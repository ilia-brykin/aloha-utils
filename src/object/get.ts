import {
  toPath,
} from "../shared/path.js";

type PathKey = string | number;

/**
 * Gets the value at path of object. If the resolved value is undefined,
 * the defaultValue is returned in its place.
 *
 * @param {*} object - The object to query.
 * @param {string|Array<string|number>} path - The path of the property to get.
 * @param {*} [defaultValue] - The value returned if the resolved value is undefined.
 * @return {*} The resolved value.
 *
 * @example
 * const object = { a: [{ b: { c: 3 } }] };
 * get(object, "a[0].b.c"); // 3
 * get(object, ["a", "0", "b", "c"]); // 3
 * get(object, "a.b.c", "default"); // "default"
 */
export const get = (
  object: unknown,
  path: string | Array<string | number>,
  defaultValue?: unknown,
): unknown => {
  const parts = Array.isArray(path) ? path : toPath(path);
  let current: unknown = object;

  for (const key of parts) {
    if (current === null || current === undefined) {
      return defaultValue;
    }

    const obj = current as Record<PathKey, unknown>;
    current = obj[key as PathKey];
  }

  return current === undefined ? defaultValue : current;
};
