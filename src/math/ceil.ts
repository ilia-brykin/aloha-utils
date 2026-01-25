import {
  normalizePrecision,
} from "./_shared.js";

/**
 * Computes number rounded up to precision.
 *
 * @param {*} number - The number to round.
 * @param {*} [precision=0] - The decimal precision.
 * @return {number|undefined} The rounded number or undefined.
 *
 * @example
 * ceil(4.006); // 5
 * ceil(6.004, 2); // 6.01
 */
export const ceil = (number: unknown, precision?: unknown): number | undefined => {
  if (typeof number !== "number" || Number.isNaN(number)) {
    return undefined;
  }

  const normalized = normalizePrecision(precision);
  const factor = 10 ** normalized;
  return Math.ceil(number * factor) / factor;
};
