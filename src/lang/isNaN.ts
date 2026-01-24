/**
 * Checks if a value is NaN.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is NaN.
 *
 * @example
 * isNaN(NaN); // true
 * isNaN("NaN"); // false
 */
export const isNaN = (value: unknown): boolean => {
  return Number.isNaN(value);
};
