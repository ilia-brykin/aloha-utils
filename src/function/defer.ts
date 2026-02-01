/**
 * Defers invoking the func until the current call stack has cleared.
 *
 * @param {Function} func - The function to defer.
 * @param {...*} [args] - The arguments to invoke func with.
 * @return {number} The timer id.
 *
 * @example
 * defer(text => console.log(text), "deferred");
 */
export const defer = (
  func: (...args: unknown[]) => unknown,
  ...args: unknown[]
): number => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  return setTimeout(func, 1, ...args) as unknown as number;
};
