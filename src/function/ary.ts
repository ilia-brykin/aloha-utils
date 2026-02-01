import {
  toInteger,
} from "../lang";

/**
 * Creates a function that invokes func with up to n arguments.
 *
 * @param {Function} func - The function to cap arguments for.
 * @param {number} [n=func.length] - The arity cap.
 * @return {Function} The new capped function.
 *
 * @example
 * const capped = ary(parseInt, 1);
 */
export const ary = (
  func: (...args: unknown[]) => unknown,
  n?: number,
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const cap = n === undefined ? func.length : toInteger(n);
  const limit = Math.max(0, cap);
  return (...args: unknown[]) => func(...args.slice(0, limit));
};
