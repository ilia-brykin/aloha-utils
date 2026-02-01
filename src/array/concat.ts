import {
  isArray,
} from "../lang";

/**
 * Creates a new array concatenating array with any additional arrays and/or values.
 *
 * @param {Array} array - The array to concatenate.
 * @param {...*} values - The values to concatenate.
 * @return {Array} The new concatenated array.
 *
 * @example
 * const array = [1];
 * const other = concat(array, 2, [3], [[4]]);
 * // other => [1, 2, 3, [4]]
 */
export const concat = <T>(array: T[], ...values: unknown[]): unknown[] => {
  const base = isArray(array) ? array.slice() : [];
  if (values.length === 0) {
    return base;
  }

  const result: unknown[] = base;
  for (const value of values) {
    if (isArray(value)) {
      result.push(...value);
    } else {
      result.push(value);
    }
  }

  return result;
};
