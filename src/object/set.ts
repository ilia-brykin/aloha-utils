import {
  toPath,
} from "../shared/path.js";
import {
  isObjectLike,
} from "../lang/isObjectLike.js";

type PathKey = string | number;

const isIndexKey = (key: PathKey): boolean => {
  if (typeof key === "number") {
    return Number.isInteger(key) && key >= 0;
  }

  return /^\d+$/.test(key);
};

const isContainer = (value: unknown): value is object | Function => (
  isObjectLike(value) || typeof value === "function"
);

const isUnsafeKey = (key: PathKey): boolean => (
  key === "__proto__" || key === "constructor" || key === "prototype"
);

/**
 * Sets the value at path of object. If a portion of path doesn't exist, it's created.
 * Arrays are created for missing index properties while objects are created for all
 * other missing properties.
 *
 * @param {*} object - The object to modify.
 * @param {string|Array<string|number>} path - The path of the property to set.
 * @param {*} value - The value to set.
 * @return {*} Returns object.
 *
 * @example
 * const object = { a: [{ b: { c: 3 } }] };
 * set(object, "a[0].b.c", 4);
 * set(object, ["x", "0", "y", "z"], 5);
 */
export const set = (
  object: unknown,
  path: string | Array<string | number>,
  value: unknown,
): unknown => {
  if (object === null || object === undefined) {
    return object;
  }

  const parts = Array.isArray(path) ? path : toPath(path);
  if (parts.length === 0) {
    return object;
  }

  let current: unknown = object;

  for (let i = 0; i < parts.length; i += 1) {
    const key = parts[i] as PathKey;

    if (isUnsafeKey(key)) {
      return object;
    }

    if (!isContainer(current)) {
      return object;
    }

    const obj = current as Record<PathKey, unknown>;

    if (i === parts.length - 1) {
      obj[key] = value;
      return object;
    }

    const nextKey = parts[i + 1] as PathKey;
    let next = obj[key];

    if (!isContainer(next)) {
      next = isIndexKey(nextKey) ? [] : {};
      obj[key] = next;
    }

    current = next;
  }

  return object;
};
