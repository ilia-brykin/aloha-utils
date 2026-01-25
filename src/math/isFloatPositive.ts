import {
  isFloat,
} from "./isFloat.js";

/**
 * Checks if a value is a positive finite non-integer number.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a positive finite non-integer number.
 *
 * @example
 * isFloatPositive(1.5); // true
 * isFloatPositive(1); // false
 */
export const isFloatPositive = (value: unknown): value is number => {
  return isFloat(value) && value > 0;
};
