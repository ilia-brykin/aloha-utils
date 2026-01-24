/**
 * Checks if a value is a boolean.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a boolean.
 *
 * @example
 * isBoolean(true); // true
 * isBoolean("true"); // false
 */
export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};
