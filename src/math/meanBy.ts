import {
  resolveIteratee,
} from "../shared/iteratee.js";

/**
 * Returns the mean of numeric iteratee values.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function|string|Array} iteratee - The iteratee function or property path.
 * @return {number|undefined} The mean or undefined.
 *
 * @example
 * meanBy([{ n: 1 }, { n: 2 }], o => o.n); // 1.5
 * meanBy([{ n: 1 }, { n: 2 }], "n"); // 1.5
 */
export const meanBy = <T>(
  array: T[],
  iteratee: ((value: T) => unknown) | string | Array<string | number>,
): number | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  const getValue = resolveIteratee(iteratee);

  let total = 0;
  let count = 0;

  for (const item of array) {
    const value = getValue(item);
    if (typeof value !== "number" || Number.isNaN(value)) {
      continue;
    }

    total += value;
    count += 1;
  }

  return count > 0 ? total / count : undefined;
};
