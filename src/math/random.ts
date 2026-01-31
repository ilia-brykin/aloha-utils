import {
  toFinite,
} from "../lang";

/**
 * Produces a random number between the inclusive lower and upper bounds.
 * If only one argument is provided a number between 0 and the given number
 * is returned. If floating is true, or either lower or upper are floats,
 * a floating-point number is returned instead of an integer.
 *
 * Note: JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @param {number} [lower=0] - The lower bound.
 * @param {number} [upper=1] - The upper bound.
 * @param {boolean} [floating] - Specify returning a floating-point number.
 * @return {number} Returns the random number.
 *
 * @example
 * random(0, 5); // integer between 0 and 5
 * random(5); // integer between 0 and 5
 * random(5, true); // floating-point between 0 and 5
 * random(1.2, 5.2); // floating-point between 1.2 and 5.2
 */
export const random = (
  lower?: number | boolean,
  upper?: number | boolean,
  floating?: boolean,
): number => {
  if (floating === undefined) {
    if (typeof upper === "boolean") {
      floating = upper;
      upper = undefined;
    } else if (typeof lower === "boolean") {
      floating = lower;
      lower = undefined;
    }
  }

  let low: number;
  let high: number;

  if (lower === undefined && upper === undefined) {
    low = 0;
    high = 1;
  } else {
    low = toFinite(lower);
    if (upper === undefined) {
      high = low;
      low = 0;
    } else {
      high = toFinite(upper);
    }
  }

  if (low > high) {
    const temp = low;
    low = high;
    high = temp;
  }

  if (floating || low % 1 || high % 1) {
    const rand = Math.random();
    const extra = parseFloat(`1e-${ (rand + "").length - 1 }`);
    return Math.min(low + (rand * (high - low + extra)), high);
  }

  return low + Math.floor(Math.random() * (high - low + 1));
};
