/**
 * Checks if a value is an integer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an integer.
 *
 * @example
 * isInteger(10); // true
 * isInteger(10.5); // false
 */
export const isInteger = (value: unknown): value is number => {
  return typeof value === "number" && Number.isInteger(value);
};
