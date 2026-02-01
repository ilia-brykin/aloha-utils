/**
 * Creates a function that invokes func with arguments reversed.
 *
 * @param {Function} func - The function to flip arguments for.
 * @return {Function} The new flipped function.
 *
 * @example
 * const flipped = flip((a, b, c) => [a, b, c]);
 */
export const flip = (func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  return function (this: unknown, ...args: unknown[]) {
    return func.apply(this, args.reverse());
  };
};
