import {
  normalizePrecision,
} from "./_shared.js";

/**
 * Computes number rounded to precision.
 *
 * @param {*} number - The number to round.
 * @param {*} [precision=0] - The decimal precision.
 * @return {number|undefined} The rounded number or undefined.
 *
 * @example
 * round(4.006); // 4
 * round(4.006, 2); // 4.01
 */
export const round = (number: unknown, precision?: unknown): number | undefined => {
  if (typeof number !== "number" || Number.isNaN(number)) {
    return undefined;
  }

  const normalized = normalizePrecision(precision);
  const factor = 10 ** normalized;
  return Math.round(number * factor) / factor;
};
