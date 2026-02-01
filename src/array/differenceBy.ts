import {
  eq,
  isArray,
} from "../lang";
import {
  flattenValues,
} from "./_arrayHelpers.js";


type Iteratee = ((value: unknown) => unknown) | string;

const identity = (value: unknown): unknown => value;

const resolveIteratee = (iteratee?: Iteratee): ((value: unknown) => unknown) => {
  if (typeof iteratee === "function") {
    return iteratee;
  }

  if (typeof iteratee === "string") {
    return (value: unknown) => {
      if (value !== null && typeof value === "object") {
        return (value as Record<string, unknown>)[iteratee];
      }
      return undefined;
    };
  }

  return identity;
};

/**
 * This method is like difference except that it accepts iteratee which is
 * invoked for each element of array and values to generate the criterion by
 * which they're compared.
 *
 * @param {Array} array - The array to inspect.
 * @param {Array} [values] - The values to exclude.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {Array} The new array of filtered values.
 *
 * @example
 * differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
 * differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], "x"); // [{ x: 2 }]
 */
export const differenceBy = <T>(
  array: T[],
  values?: unknown[] | unknown,
  iteratee?: Iteratee,
): T[] => {
  if (!isArray(array)) {
    return [];
  }

  const length = array.length;
  if (length === 0) {
    return [];
  }

  let excludes: unknown[] = [];
  if (values !== undefined) {
    if (isArray(values)) {
      const hasNested = values.some(item => isArray(item));
      excludes = hasNested ? flattenValues(values) : values.slice();
    } else {
      excludes = [values];
    }
  }
  if (excludes.length === 0) {
    return array.slice();
  }

  const mapper = resolveIteratee(iteratee);
  const excludeSet = excludes.map(value => mapper(value));

  return array.filter(item => {
    const criterion = mapper(item);
    return !excludeSet.some(value => eq(value, criterion));
  });
};
