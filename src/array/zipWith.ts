import {
  isArray,
  isFunction,
} from "../lang";
import {
  zip,
} from "./zip.js";

/**
 * This method is like zip except that it accepts iteratee to specify how grouped
 * values should be combined.
 *
 * @param {...Array} arrays - The arrays to process.
 * @param {Function} [iteratee] - The function to combine grouped values.
 * @return {Array} The new array of grouped elements.
 *
 * @example
 * zipWith([1, 2], [10, 20], (a, b) => a + b); // [11, 22]
 */
export function zipWith<T>(
  arrays: T[][],
  iteratee?: (...values: T[]) => unknown,
): unknown[] {
  const arraysAndIteratee = Array.from(arguments) as Array<T[] | ((...values: T[]) => unknown)>;
  if (arraysAndIteratee.length === 0) {
    return [];
  }

  let resolvedIteratee: ((...values: T[]) => unknown) | undefined;
  let resolvedArrays: T[][] = arraysAndIteratee as T[][];

  const last = arraysAndIteratee[arraysAndIteratee.length - 1];
  if (isFunction(last)) {
    resolvedIteratee = last as (...values: T[]) => unknown;
    resolvedArrays = arraysAndIteratee.slice(0, -1) as T[][];
  }

  if (resolvedArrays.length === 0) {
    return [];
  }

  if (resolvedArrays.some(array => !isArray(array))) {
    return [];
  }

  if (!resolvedIteratee) {
    return zip(...resolvedArrays);
  }

  return zip(...resolvedArrays).map(group => resolvedIteratee(...group));
}
