/**
 * Checks if a value is a string.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a string.
 *
 * @example
 * isString("hello"); // true
 * isString(123); // false
 */
export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};
