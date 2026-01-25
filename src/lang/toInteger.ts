import {
  toNumber,
} from "./toNumber.js";

/**
 * Converts a value to an integer.
 *
 * @param {*} value - The value to convert.
 * @return {number} The integer representation.
 *
 * @example
 * toInteger(false); // 0
 * toInteger([123]); // 123
 */
export const toInteger = (value: unknown): number => {
  const num = toNumber(value);

  if (Number.isNaN(num) ||
    num === 0) {
    return 0;
  }

  if (num === Infinity) {
    return Number.MAX_VALUE;
  }

  if (num === -Infinity) {
    return -Number.MAX_VALUE;
  }

  return Math.trunc(num);
};
