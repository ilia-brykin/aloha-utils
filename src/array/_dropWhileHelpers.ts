import {
  eq,
  isObjectLike,
} from "../lang";
import {
  getByPath,
} from "../shared/iteratee.js";

export type DropPredicate =
  | ((value: unknown, index: number, array: unknown[]) => unknown)
  | string
  | [string | number | Array<string | number>, unknown]
  | Record<string, unknown>;

const identity = (value: unknown): unknown => value;

export const resolveDropPredicate = (
  predicate?: DropPredicate,
): ((value: unknown, index: number, array: unknown[]) => unknown) => {
  if (typeof predicate === "function") {
    return predicate;
  }

  if (predicate === null || predicate === undefined) {
    return identity;
  }

  if (Array.isArray(predicate) && predicate.length === 2) {
    const [path, expected] = predicate;
    const resolvedPath = typeof path === "number" ? [path] : path;
    return (value: unknown) => eq(getByPath(value, resolvedPath), expected);
  }

  if (typeof predicate === "string") {
    return (value: unknown) => getByPath(value, predicate);
  }

  if (isObjectLike(predicate)) {
    const source = predicate as Record<string, unknown>;
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
