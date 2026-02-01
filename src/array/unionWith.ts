import {
  includesWith,
} from "./_compareHelpers.js";
import {
  isArray,
} from "../lang";

type Comparator = (arrVal: unknown, othVal: unknown) => unknown;

/**
 * This method is like union except that it accepts comparator which is invoked
 * to compare elements of arrays.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @param {Function} [comparator] - The comparator invoked per element.
 * @return {Array} The new array of combined values.
 *
 * @example
 * unionWith([{ x: 1 }], [{ x: 1 }], (a, b) => a.x === b.x); // [{ x: 1 }]
 */
export function unionWith<T>(
  arrays: T[][],
  comparator?: Comparator,
): T[] {
  const arraysAndComparator = Array.from(arguments) as Array<T[] | Comparator>;
  if (arraysAndComparator.length === 0) {
    return [];
  }

  let resolvedComparator: Comparator | undefined;
  let resolvedArrays: T[][] = arraysAndComparator as T[][];

  const last = arraysAndComparator[arraysAndComparator.length - 1];
  if (typeof last === "function") {
    resolvedComparator = last as Comparator;
    resolvedArrays = arraysAndComparator.slice(0, -1) as T[][];
  }

  if (resolvedArrays.length === 0) {
    return [];
  }

  if (resolvedArrays.some(array => !isArray(array))) {
    return [];
  }

  const result: T[] = [];
  for (const array of resolvedArrays) {
    for (const value of array) {
      if (!includesWith(result as unknown[], value, resolvedComparator)) {
        result.push(value);
      }
    }
  }

  return result;
}
