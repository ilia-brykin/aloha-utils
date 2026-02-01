import {
  isCollection,
  forEachCollectionValue,
} from "./_collectionHelpers.js";
import {
  getByPath,
} from "../shared/iteratee.js";

type Path = Array<string | number> | string | ((...args: unknown[]) => unknown);

/**
 * Invokes the method at path of each element in collection, returning an array
 * of the results of each invoked method.
 *
 * @param {Array|Object} collection - The collection to iterate over.
 * @param {Array|Function|string} path - The path of the method to invoke.
 * @param {...*} [args] - The arguments to invoke each method with.
 * @return {Array} The array of results.
 *
 * @example
 * invokeMap([[5, 1], [3, 2]], "sort"); // [[1, 5], [2, 3]]
 */
export const invokeMap = (
  collection: unknown,
  path: Path,
  ...args: unknown[]
): unknown[] => {
  if (!isCollection(collection)) {
    return [];
  }

  const result: unknown[] = [];
  const isFuncPath = typeof path === "function";

  forEachCollectionValue(collection, (value) => {
    if (isFuncPath) {
      result.push((path as (...values: unknown[]) => unknown).call(value, ...args));
      return;
    }

    const method = getByPath(value, path as string | Array<string | number>);
    if (typeof method === "function") {
      result.push(method.call(value, ...args));
    } else {
      result.push(undefined);
    }
  });

  return result;
};
