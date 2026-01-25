/**
 * Checks if a value is a finite non-integer number.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a finite non-integer number.
 *
 * @example
 * isFloat(1.5); // true
 * isFloat(2); // false
 */
export const isFloat = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value) && !Number.isInteger(value);
};
