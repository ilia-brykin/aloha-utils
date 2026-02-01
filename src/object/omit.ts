import {
  forIn,
} from "./forIn.js";
import {
  hasIn,
} from "./hasIn.js";
import {
  unset,
} from "./unset.js";

type Path = string | Array<string | number>;

const normalizePaths = (paths: Array<Path | Array<Path>>): Path[] => (
  paths.length === 1 && Array.isArray(paths[0])
    ? (paths[0] as Path[])
    : (paths as Path[])
);

/**
 * The opposite of pick; this method creates an object composed of the own and
 * inherited enumerable property paths of object that are not omitted.
 *
 * @param {Object} object - The source object.
 * @param {...(string|string[])} [paths] - The property paths to omit.
 * @return {Object} Returns the new object.
 *
 * @example
 * const object = { a: 1, b: "2", c: 3 };
 * omit(object, ["a", "c"]); // { b: "2" }
 */
export const omit = (
  object: unknown,
  ...paths: Array<Path | Array<Path>>
): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  forIn(object, (value, key) => {
    result[key as string] = value;
  });

  const normalized = normalizePaths(paths);
  for (const path of normalized) {
    if (hasIn(object, path)) {
      unset(result, path);
    }
  }

  return result;
};
