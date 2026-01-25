import {
  isInteger,
} from "./isInteger.js";

/**
 * Checks if a value is a positive integer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a positive integer.
 *
 * @example
 * isIntegerPositive(3); // true
 * isIntegerPositive(0); // false
 */
export const isIntegerPositive = (value: unknown): value is number => {
  return isInteger(value) && value > 0;
};
