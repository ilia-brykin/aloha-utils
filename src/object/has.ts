import {
  isObjectLike,
} from "../lang";
import {
  toPath,
} from "../shared/path.js";

type PathKey = string | number;

/**
 * Checks if path is a direct property of object.
 *
 * @param {Object} object - The object to query.
 * @param {Array|string} path - The path to check.
 * @return {boolean} Returns true if path exists, else false.
 *
 * @example
 * const object = { a: { b: 2 } };
 * has(object, "a.b"); // true
 */
export const has = (
  object: unknown,
  path: string | Array<string | number>,
): boolean => {
  if (!isObjectLike(object)) {
    return false;
  }

  const parts = Array.isArray(path) ? path : toPath(path);
  if (parts.length === 0) {
    return false;
  }

  let current: unknown = object;

  for (const key of parts) {
    if (!isObjectLike(current)) {
      return false;
    }

    const obj = current as Record<PathKey, unknown>;
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
    current = obj[key];
  }

  return true;
};
