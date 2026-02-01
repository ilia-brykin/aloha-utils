import {
  isFunction,
  isObjectLike,
} from "../lang";
import {
  toPath,
} from "../shared/path.js";

type PathKey = string | number;

/**
 * This method is like get except that if the resolved value is a function it's
 * invoked with the this binding of its parent object and its result is returned.
 *
 * @param {Object} object - The object to query.
 * @param {Array|string} path - The path of the property to resolve.
 * @param {*} [defaultValue] - The value returned for undefined resolved values.
 * @return {*} Returns the resolved value.
 *
 * @example
 * const object = { a: [{ b: { c1: 3, c2: () => 4 } }] };
 * result(object, "a[0].b.c1"); // 3
 * result(object, "a[0].b.c2"); // 4
 */
export const result = (
  object: unknown,
  path: string | Array<string | number>,
  defaultValue?: unknown,
): unknown => {
  const parts = Array.isArray(path) ? path : toPath(path);
  if (parts.length === 0) {
    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  }

  let current: unknown = object;
  let parent: unknown = undefined;

  for (const key of parts) {
    if (!isObjectLike(current)) {
      current = undefined;
      break;
    }
    parent = current;
    current = (current as Record<PathKey, unknown>)[key as PathKey];
  }

  if (current === undefined) {
    return isFunction(defaultValue) ? defaultValue() : defaultValue;
  }

  if (isFunction(current)) {
    return current.call(parent);
  }

  return current;
};
