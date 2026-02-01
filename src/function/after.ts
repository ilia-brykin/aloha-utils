/**
 * The opposite of before; invokes func once it's called n or more times.
 *
 * @param {number} n - The number of calls before func is invoked.
 * @param {Function} func - The function to restrict.
 * @return {Function} The new restricted function.
 *
 * @example
 * const done = after(2, () => "ok");
 */
export const after = (n: number, func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  let counter = n;
  return (...args: unknown[]) => {
    counter -= 1;
    if (counter < 1) {
      return func(...args);
    }
    return undefined;
  };
};
