/**
 * Checks if a value is undefined.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is undefined.
 *
 * @example
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 */
export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined;
};
