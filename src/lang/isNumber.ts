/**
 * Checks if a value is a number.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a number.
 *
 * @example
 * isNumber(42); // true
 * isNumber("11"); // false
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};
