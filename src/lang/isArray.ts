/**
 * Checks if a value is an array.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an array.
 *
 * @example
 * isArray([1, 2, 3]); // true
 * isArray("hello"); // false
 */
export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};
