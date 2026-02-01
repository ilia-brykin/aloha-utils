import {
  eq,
  isObjectLike,
} from "../lang";
import {
  getByPath,
} from "../shared/iteratee.js";

export type CollectionIteratee =
  | ((value: unknown, key?: string | number, collection?: unknown) => unknown)
  | string
  | number
  | Array<string | number>
  | [string | number | Array<string | number>, unknown]
  | Record<string, unknown>;

const identity = (value: unknown): unknown => value;

export const resolveCollectionIteratee = (
  iteratee?: CollectionIteratee,
): ((value: unknown, key?: string | number, collection?: unknown) => unknown) => {
  if (iteratee === undefined) {
    return identity;
  }

  if (typeof iteratee === "function") {
    return iteratee;
  }

  if (Array.isArray(iteratee)) {
    if (iteratee.length === 2) {
      const [path, expected] = iteratee;
      const resolvedPath = typeof path === "number" ? [path] : path;
      return (value: unknown) => eq(getByPath(value, resolvedPath as string | Array<string | number>), expected);
    }

    return (value: unknown) => getByPath(value, iteratee as Array<string | number>);
  }

  if (typeof iteratee === "string") {
    return (value: unknown) => getByPath(value, iteratee);
  }

  if (typeof iteratee === "number") {
    return (value: unknown) => getByPath(value, [iteratee]);
  }

  if (isObjectLike(iteratee)) {
    const source = iteratee as Record<string, unknown>;
    const keys = Object.keys(source);

    return (value: unknown) => {
      if (!isObjectLike(value)) {
        return false;
      }
      const obj = value as Record<string, unknown>;
      for (const key of keys) {
        if (!eq(obj[key], source[key])) {
          return false;
        }
      }
      return true;
    };
  }

  return identity;
};
