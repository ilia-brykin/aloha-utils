/**
 * Checks if a value is a non-empty string.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a non-empty string.
 *
 * @example
 * isNonEmptyString("hi"); // true
 * isNonEmptyString(""); // false
 */
export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === "string" && value.length > 0;
};
