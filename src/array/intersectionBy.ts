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

const includesSameValueZero = (array: unknown[], value: unknown): boolean => array.some(item => eq(item, value));

/**
 * This method is like intersection except that it accepts iteratee which is
 * invoked for each element of each arrays to generate the criterion by which
 * they're compared.
 *
 * @param {...Array} arrays - The arrays to inspect.
 * @param {Function|string} [iteratee] - The iteratee invoked per element.
 * @return {Array} The new array of intersecting values.
 *
 * @example
 * intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
 */
export function intersectionBy<T>(
  arrays: T[][],
  iteratee?: Iteratee,
): T[] {
  const arraysAndIteratee = Array.from(arguments) as Array<T[] | Iteratee>;
  if (arraysAndIteratee.length === 0) {
    return [];
  }

  let resolvedIteratee: Iteratee | undefined;
  let resolvedArrays: T[][] = arraysAndIteratee as T[][];

  const last = arraysAndIteratee[arraysAndIteratee.length - 1];
  if (!isArray(last)) {
    resolvedIteratee = last as Iteratee;
    resolvedArrays = arraysAndIteratee.slice(0, -1) as T[][];
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

  const mapper = resolveIteratee(resolvedIteratee);
  const restCriteria = rest.map(array => array.map(item => mapper(item)));
  const seenCriteria: unknown[] = [];
  const result: T[] = [];

  for (const value of first) {
    const criterion = mapper(value);
    if (includesSameValueZero(seenCriteria, criterion)) {
      continue;
    }

    let isInAll = true;
    for (const criteria of restCriteria) {
      if (!includesSameValueZero(criteria, criterion)) {
        isInAll = false;
        break;
      }
    }

    if (isInAll) {
      seenCriteria.push(criterion);
      result.push(value);
    }
  }

  return result;
}
