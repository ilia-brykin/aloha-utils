import {
  isArray,
} from "../lang";
import {
  includesWith,
} from "./_compareHelpers.js";

type Comparator = (arrVal: unknown, othVal: unknown) => unknown;

/**
 * This method is like intersection except that it accepts comparator which is
 * invoked to compare elements of arrays.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @param {Function} [comparator] - The comparator invoked per element.
 * @return {Array} The new array of intersecting values.
 *
 * @example
 * intersectionWith([{ x: 1 }], [{ x: 1 }], (a, b) => a.x === b.x); // [{ x: 1 }]
 */
export function intersectionWith<T>(
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

  const [first, ...rest] = resolvedArrays;
  if (first.length === 0) {
    return [];
  }

  const result: T[] = [];
  for (const value of first) {
    if (includesWith(result as unknown[], value, resolvedComparator)) {
      continue;
    }

    let isInAll = true;
    for (const array of rest) {
      if (!includesWith(array as unknown[], value, resolvedComparator)) {
        isInAll = false;
        break;
      }
    }

    if (isInAll) {
      result.push(value);
    }
  }

  return result;
}
