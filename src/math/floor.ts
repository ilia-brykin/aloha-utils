import {
  normalizePrecision,
} from "./_shared.js";

/**
 * Computes number rounded down to precision.
 *
 * @param {*} number - The number to round.
 * @param {*} [precision=0] - The decimal precision.
 * @return {number|undefined} The rounded number or undefined.
 *
 * @example
 * floor(4.006); // 4
 * floor(0.046, 2); // 0.04
 */
export const floor = (number: unknown, precision?: unknown): number | undefined => {
  if (typeof number !== "number" || Number.isNaN(number)) {
    return undefined;
  }

  const normalized = normalizePrecision(precision);
  const factor = 10 ** normalized;
  return Math.floor(number * factor) / factor;
};
