import {
  isObjectLike,
} from "../lang";
import {
  toPath,
} from "../shared/path.js";

type PathKey = string | number;
type SetCustomizer = (nsValue: unknown, key: PathKey, nsObject: unknown) => unknown;

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
 * This method is like set except that it accepts customizer which is invoked to
 * produce the objects of path.
 *
 * @param {Object} object - The object to modify.
 * @param {Array|string} path - The path of the property to set.
 * @param {*} value - The value to set.
 * @param {Function} [customizer] - The function to customize assigned values.
 * @return {Object} Returns object.
 *
 * @example
 * const object = {};
 * setWith(object, "[0][1]", "a", Object);
 * // => { "0": { "1": "a" } }
 */
export const setWith = (
  object: unknown,
  path: string | Array<string | number>,
  value: unknown,
  customizer?: SetCustomizer,
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
      let created: unknown = undefined;
      if (customizer) {
        created = customizer(next, key, obj);
      }
      if (created === undefined) {
        created = isIndexKey(nextKey) ? [] : {};
      }
      obj[key] = created;
      next = created;
    }

    current = next;
  }

  return object;
};
