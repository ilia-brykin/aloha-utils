import {
  eq,
  isArray,
} from "../lang";
import {
  flattenValues,
} from "./_arrayHelpers.js";

type Comparator = (arrVal: unknown, othVal: unknown) => boolean;

/**
 * This method is like difference except that it accepts comparator which is
 * invoked to compare elements of array to values.
 *
 * @param {Array} array - The array to inspect.
 * @param {...Array} valuesAndComparator - The values to exclude and optional comparator.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * const objects = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * differenceWith(objects, [{ x: 1, y: 2 }], (a, b) => a.x === b.x && a.y === b.y);
 * // => [{ x: 2, y: 1 }]
 */
export const differenceWith = <T>(
  array: T[],
  ...valuesAndComparator: unknown[]
): T[] => {
  if (!isArray(array)) {
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  let comparator: Comparator | undefined;
  if (valuesAndComparator.length > 0) {
    const last = valuesAndComparator[valuesAndComparator.length - 1];
    if (typeof last === "function") {
      comparator = last as Comparator;
      valuesAndComparator = valuesAndComparator.slice(0, -1);
    }
  }

  const excludes = flattenValues(valuesAndComparator);
  if (excludes.length === 0) {
    return array.slice();
  }

  const compare = comparator ?? ((a: unknown, b: unknown) => eq(a, b));
  return array.filter(item => !excludes.some(value => compare(item, value)));
};
