import {
  includesWith,
} from "./_compareHelpers.js";
import {
  isArray,
} from "../lang";
import {
  xor,
} from "./xor.js";

type Comparator = (arrVal: unknown, othVal: unknown) => unknown;

const uniqueByComparator = <T>(
  array: T[],
  comparator: Comparator,
): T[] => {
  const result: T[] = [];
  for (const value of array) {
    if (!includesWith(result as unknown[], value, comparator)) {
      result.push(value);
    }
  }
  return result;
};

/**
 * This method is like xor except that it accepts comparator which is invoked to compare elements.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @param {Function} [comparator] - The comparator invoked per element.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * xorWith([{ x: 1 }], [{ x: 2 }], (a, b) => a.x === b.x); // [{ x: 1 }, { x: 2 }]
 */
export function xorWith<T>(
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

  if (!resolvedComparator) {
    return xor(...resolvedArrays);
  }

  const compare = resolvedComparator;
  const result: T[] = [];

  for (const array of resolvedArrays) {
    const uniqueArray = uniqueByComparator(array, compare);
    for (const value of uniqueArray) {
      const index = result.findIndex(item => includesWith([item], value, compare));
      if (index === -1) {
        result.push(value);
      } else {
        result.splice(index, 1);
      }
    }
  }

  return result;
}
