import {
  toInteger,
} from "../lang";

/**
 * Creates a function that invokes func with arguments from start and beyond provided as an array.
 *
 * @param {Function} func - The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] - The start position of the rest parameter.
 * @return {Function} The new function.
 *
 * @example
 * const say = rest((what, names) => `${what} ${names.join(", ")}`);
 */
export const rest = (
  func: (...args: unknown[]) => unknown,
  start?: number,
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const startIndex = Math.max(0, start === undefined ? func.length - 1 : toInteger(start));

  return function(this: unknown, ...args: unknown[]) {
    const leading = args.slice(0, startIndex);
    const restArgs = args.slice(startIndex);
    return func.apply(this, [...leading, restArgs]);
  };
};
