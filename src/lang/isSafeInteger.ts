/**
 * Checks if a value is a safe integer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a safe integer.
 *
 * @example
 * isSafeInteger(3); // true
 * isSafeInteger(Number.MIN_VALUE); // false
 */
export const isSafeInteger = (value: unknown): value is number => {
  return typeof value === "number" && Number.isSafeInteger(value);
};
