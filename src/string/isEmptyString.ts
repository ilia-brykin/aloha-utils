/**
 * Checks if a value is an empty string.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an empty string.
 *
 * @example
 * isEmptyString(""); // true
 * isEmptyString(" "); // false
 */
export const isEmptyString = (value: unknown): value is "" => {
  return typeof value === "string" && value.length === 0;
};
