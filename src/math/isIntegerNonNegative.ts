import {
  isInteger,
} from "./isInteger.js";

/**
 * Checks if a value is a non-negative integer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a non-negative integer.
 *
 * @example
 * isIntegerNonNegative(0); // true
 * isIntegerNonNegative(-1); // false
 */
export const isIntegerNonNegative = (value: unknown): value is number => {
  return isInteger(value) && value >= 0;
};
