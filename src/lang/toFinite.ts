import {
  toNumber,
} from "./toNumber.js";

/**
 * Converts a value to a finite number.
 *
 * @param {*} value - The value to convert.
 * @return {number} The finite number representation.
 *
 * @example
 * toFinite(3.2); // 3.2
 * toFinite(Number.MIN_VALUE); // 5e-324
 * toFinite(Infinity); // 1.7976931348623157e+308
 * toFinite("3.2"); // 3.2
 */
export const toFinite = (value: unknown): number => {
  const num = toNumber(value);

  if (Number.isNaN(num) || num === 0) {
    return 0;
  }

  if (num === Infinity) {
    return Number.MAX_VALUE;
  }

  if (num === -Infinity) {
    return -Number.MAX_VALUE;
  }

  return num;
};
