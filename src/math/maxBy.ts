import {
  resolveIteratee,
} from "../shared/iteratee.js";

/**
 * Returns the element with the maximum numeric iteratee value.
 *
 * @param {Array} array - The array to inspect.
 * @param {Function|string|Array} iteratee - The iteratee function or property path.
 * @return {*} The element with the maximum numeric iteratee value or undefined.
 *
 * @example
 * maxBy([{ n: 1 }, { n: 2 }], o => o.n); // { n: 2 }
 * maxBy([{ n: 1 }, { n: 2 }], "n"); // { n: 2 }
 */
export const maxBy = <T>(
  array: T[],
  iteratee: ((value: T) => unknown) | string | Array<string | number>,
): T | undefined => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  const getValue = resolveIteratee(iteratee);

  let result: T | undefined;
  let resultValue: number | undefined;

  for (const item of array) {
    const value = getValue(item);
    if (typeof value !== "number" || Number.isNaN(value)) {
      continue;
    }

    if (resultValue === undefined || value > resultValue) {
      resultValue = value;
      result = item;
    }
  }

  return result;
};
