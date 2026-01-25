import {
  resolveIteratee,
} from "../shared/iteratee.js";

/**
 * Returns the median of numeric iteratee values.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function|string|Array} iteratee - The iteratee function or property path.
 * @return {number|undefined} The median or undefined.
 *
 * @example
 * medianBy([{ n: 1 }, { n: 3 }, { n: 2 }], o => o.n); // 2
 * medianBy([{ n: 1 }, { n: 3 }, { n: 2 }], "n"); // 2
 */
export const medianBy = <T>(
  array: T[],
  iteratee: ((value: T) => unknown) | string | Array<string | number>,
): number | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  const getValue = resolveIteratee(iteratee);
  const numbers = array
    .map(getValue)
    .filter(
      (value): value is number => {
        return typeof value === "number" && !Number.isNaN(value);
      },
    );

  if (numbers.length === 0) {
    return undefined;
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }

  return (sorted[mid - 1] + sorted[mid]) / 2;
};
