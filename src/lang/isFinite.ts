/**
 * Checks if a value is a finite number.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a finite number.
 *
 * @example
 * isFinite(10); // true
 * isFinite(Infinity); // false
 */
export const isFinite = (value: unknown): value is number => {
  return typeof value === "number" && Number.isFinite(value);
};
