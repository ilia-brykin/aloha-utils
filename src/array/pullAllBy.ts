import {
  eq,
  isArray,
} from "../lang";


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
 * This method is like pullAll except that it accepts iteratee which is
 * invoked for each element of array and values to generate the criterion by
 * which they're compared. This method mutates array.
 *
 * @param {Array} array - The array to modify.
 * @param {Array} values - The values to remove.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {Array} Returns array.
 *
 * @example
 * const array = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];
 * pullAllBy(array, [{ x: 1 }, { x: 3 }], "x");
 * // array => [{ x: 2 }]
 */
export const pullAllBy = <T>(
  array: T[],
  values: unknown[],
  iteratee?: Iteratee,
): T[] => {
  if (!isArray(array) || !isArray(values) || values.length === 0) {
    return array;
  }

  const mapper = resolveIteratee(iteratee);
  const excludes = values.map(value => mapper(value));

  for (let i = array.length - 1; i >= 0; i -= 1) {
    const criterion = mapper(array[i]);
    if (excludes.some(value => eq(value, criterion))) {
      array.splice(i, 1);
    }
  }

  return array;
};
