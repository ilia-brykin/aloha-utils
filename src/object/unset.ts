import {
  isObjectLike,
} from "../lang";
import {
  toPath,
} from "../shared/path.js";

type PathKey = string | number;

const isUnsafeKey = (key: PathKey): boolean => (
  key === "__proto__" || key === "constructor" || key === "prototype"
);

/**
 * Removes the property at path of object.
 *
 * @param {Object} object - The object to modify.
 * @param {Array|string} path - The path of the property to unset.
 * @return {boolean} Returns true if the property is deleted, else false.
 *
 * @example
 * const object = { a: [{ b: { c: 7 } }] };
 * unset(object, "a[0].b.c"); // true
 */
export const unset = (
  object: unknown,
  path: string | Array<string | number>,
): boolean => {
  if (!isObjectLike(object)) {
    return true;
  }

  const parts = Array.isArray(path) ? path : toPath(path);
  if (parts.length === 0) {
    return true;
  }

  let current: unknown = object;

  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i] as PathKey;
    if (isUnsafeKey(key)) {
      return false;
    }
    if (!isObjectLike(current)) {
      return true;
    }
    current = (current as Record<PathKey, unknown>)[key];
  }

  const lastKey = parts[parts.length - 1] as PathKey;
  if (isUnsafeKey(lastKey)) {
    return false;
  }

  if (!isObjectLike(current)) {
    return true;
  }

  return delete (current as Record<PathKey, unknown>)[lastKey];
};
