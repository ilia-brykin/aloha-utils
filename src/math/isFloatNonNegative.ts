import {
  isFloat,
} from "./isFloat.js";

/**
 * Checks if a value is a non-negative finite non-integer number.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a non-negative finite non-integer number.
 *
 * @example
 * isFloatNonNegative(0.1); // true
 * isFloatNonNegative(0); // false
 */
export const isFloatNonNegative = (value: unknown): value is number => {
  return isFloat(value) && value >= 0;
};
