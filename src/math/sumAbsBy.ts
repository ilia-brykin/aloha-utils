import {
  resolveIteratee,
} from "../shared/iteratee.js";

/**
 * Returns the sum of absolute numeric iteratee values.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function|string|Array} iteratee - The iteratee function or property path.
 * @return {number|undefined} The sum of absolute values or undefined.
 *
 * @example
 * sumAbsBy([{ n: 1 }, { n: -2 }], o => o.n); // 3
 * sumAbsBy([{ n: 1 }, { n: -2 }], "n"); // 3
 */
export const sumAbsBy = <T>(
  array: T[],
  iteratee: ((value: T) => unknown) | string | Array<string | number>,
): number | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  const getValue = resolveIteratee(iteratee);
  let total = 0;
  let hasNumber = false;

  for (const item of array) {
    const value = getValue(item);
    if (typeof value !== "number" || Number.isNaN(value)) {
      continue;
    }

    total += Math.abs(value);
    hasNumber = true;
  }

  return hasNumber ? total : undefined;
};
