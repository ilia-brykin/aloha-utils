import {
  isInteger,
} from "./isInteger.js";

/**
 * Checks if a value is an odd integer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an odd integer.
 *
 * @example
 * isOdd(3); // true
 * isOdd(2); // false
 */
export const isOdd = (value: unknown): boolean => {
  return isInteger(value) && Math.abs(value % 2) === 1;
};
