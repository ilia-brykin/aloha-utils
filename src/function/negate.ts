/**
 * Creates a function that negates the result of the predicate func.
 *
 * @param {Function} predicate - The predicate to negate.
 * @return {Function} The new negated function.
 *
 * @example
 * const isOdd = negate(n => n % 2 === 0);
 */
export const negate = (predicate: (...args: unknown[]) => unknown): (...args: unknown[]) => boolean => {
  if (typeof predicate !== "function") {
    throw new TypeError("Expected a function");
  }

  return function(this: unknown, ...args: unknown[]) {
    return !predicate.apply(this, args);
  };
};
