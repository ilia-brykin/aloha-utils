import {
  toInteger,
} from "../lang";

/**
 * Creates a function that invokes func with the this binding of the created function
 * and an array of arguments much like Function#apply.
 *
 * @param {Function} func - The function to spread arguments over.
 * @param {number} [start=0] - The start position of the spread.
 * @return {Function} The new function.
 *
 * @example
 * const say = spread((who, what) => `${who} says ${what}`);
 */
export const spread = (
  func: (...args: unknown[]) => unknown,
  start: number = 0,
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const startIndex = Math.max(0, toInteger(start));

  return function(this: unknown, ...args: unknown[]) {
    const array = args[startIndex];
    const leading = args.slice(0, startIndex);
    if (Array.isArray(array)) {
      return func.apply(this, [...leading, ...array]);
    }
    return func.apply(this, args);
  };
};
