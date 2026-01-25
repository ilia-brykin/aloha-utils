import {
  isInteger,
} from "./isInteger.js";

/**
 * Checks if a value is an even integer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an even integer.
 *
 * @example
 * isEven(4); // true
 * isEven(3); // false
 */
export const isEven = (value: unknown): boolean => {
  return isInteger(value) && value % 2 === 0;
};
