/**
 * Checks if a value is null or undefined.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is null or undefined.
 *
 * @example
 * isNil(null); // true
 * isNil(0); // false
 */
export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};
