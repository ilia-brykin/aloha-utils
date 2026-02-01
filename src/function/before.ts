/**
 * Creates a function that invokes func while it's called less than n times.
 * Subsequent calls return the last result.
 *
 * @param {number} n - The number of calls at which func is no longer invoked.
 * @param {Function} func - The function to restrict.
 * @return {Function} The new restricted function.
 *
 * @example
 * const limited = before(3, () => "ok");
 */
export const before = (n: number, func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  let counter = n;
  let lastResult: unknown;
  return (...args: unknown[]) => {
    counter -= 1;
    if (counter > 0) {
      lastResult = func(...args);
    }
    return lastResult;
  };
};
