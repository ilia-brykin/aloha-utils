/**
 * Checks if a value is null.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is null.
 *
 * @example
 * isNull(null); // true
 * isNull(undefined); // false
 */
export const isNull = (value: unknown): value is null => {
  return value === null;
};
