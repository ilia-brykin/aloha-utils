import {
  ary,
} from "./ary.js";

/**
 * Creates a function that accepts up to one argument.
 *
 * @param {Function} func - The function to cap arguments for.
 * @return {Function} The new capped function.
 *
 * @example
 * unary(parseInt);
 */
export const unary = (func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown => ary(func, 1);
