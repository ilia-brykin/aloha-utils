import {
  eq,
  isArray,
} from "../lang";

type Comparator = (arrVal: unknown, othVal: unknown) => boolean;

/**
 * This method is like pullAll except that it accepts comparator which is
 * invoked to compare elements of array to values. This method mutates array.
 *
 * @param {Array} array - The array to modify.
 * @param {Array} values - The values to remove.
 * @param {Function} [comparator] - The comparator invoked per element.
 * @return {Array} Returns array.
 *
 * @example
 * const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
 * pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => a.x === b.x && a.y === b.y);
 * // array => [{ x: 1, y: 2 }, { x: 5, y: 6 }]
 */
export const pullAllWith = <T>(
  array: T[],
  values: unknown[],
  comparator?: Comparator,
): T[] => {
  if (!isArray(array) || !isArray(values) || values.length === 0) {
    return array;
  }

  const compare = comparator ?? ((a: unknown, b: unknown) => eq(a, b));
  for (let i = array.length - 1; i >= 0; i -= 1) {
    if (values.some(value => compare(array[i], value))) {
      array.splice(i, 1);
    }
  }

  return array;
};
