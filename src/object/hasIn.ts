import {
  isObjectLike,
} from "../lang";
import {
  toPath,
} from "../shared/path.js";

type PathKey = string | number;

/**
 * Checks if path is a direct or inherited property of object.
 *
 * @param {Object} object - The object to query.
 * @param {Array|string} path - The path to check.
 * @return {boolean} Returns true if path exists, else false.
 *
 * @example
 * const object = Object.create({ a: { b: 2 } });
 * hasIn(object, "a.b"); // true
 */
export const hasIn = (
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
    if (!(key in obj)) {
      return false;
    }
    current = obj[key];
  }

  return true;
};
