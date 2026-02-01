import {
  get,
} from "./get.js";
import {
  hasIn,
} from "./hasIn.js";
import {
  set,
} from "./set.js";

type Path = string | Array<string | number>;

const normalizePaths = (paths: Array<Path | Array<Path>>): Path[] => (
  paths.length === 1 && Array.isArray(paths[0])
    ? (paths[0] as Path[])
    : (paths as Path[])
);

/**
 * Creates an object composed of the picked object properties.
 *
 * @param {Object} object - The source object.
 * @param {...(string|string[])} [paths] - The property paths to pick.
 * @return {Object} Returns the new object.
 *
 * @example
 * const object = { a: 1, b: "2", c: 3 };
 * pick(object, ["a", "c"]); // { a: 1, c: 3 }
 */
export const pick = (
  object: unknown,
  ...paths: Array<Path | Array<Path>>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  const normalized = normalizePaths(paths);

  for (const path of normalized) {
    if (hasIn(object, path)) {
      const value = get(object, path);
      set(result, path, value);
    }
  }

  return result;
};
