import {
  isFunction,
  isObjectLike,
} from "../lang";
import {
  toPath,
} from "../shared/path.js";

type PathKey = string | number;

const getParentAndKey = (
  object: unknown,
  path: string | Array<string | number>,
): { parent: unknown; key: PathKey } | null => {
  const parts = Array.isArray(path) ? path : toPath(path);
  if (parts.length === 0) {
    return null;
  }

  let current: unknown = object;
  for (let i = 0; i < parts.length - 1; i += 1) {
    if (!isObjectLike(current)) {
      return null;
    }
    current = (current as Record<PathKey, unknown>)[parts[i] as PathKey];
  }

  return { parent: current, key: parts[parts.length - 1] as PathKey };
};

/**
 * Invokes the method at path of object.
 *
 * @param {Object} object - The object to query.
 * @param {Array|string} path - The path of the method to invoke.
 * @param {...*} [args] - The arguments to invoke the method with.
 * @return {*} Returns the result of the invoked method.
 *
 * @example
 * const object = { a: [{ b: { c: [1, 2, 3, 4] } }] };
 * invoke(object, "a[0].b.c.slice", 1, 3); // [2, 3]
 */
export const invoke = (
  object: unknown,
  path: string | Array<string | number>,
  ...args: unknown[]
): unknown => {
  const resolved = getParentAndKey(object, path);
  if (!resolved) {
    return undefined;
  }

  const { parent, key } = resolved;
  if (!isObjectLike(parent)) {
    return undefined;
  }

  const value = (parent as Record<PathKey, unknown>)[key];
  if (!isFunction(value)) {
    return undefined;
  }

  return value.apply(parent, args);
};
