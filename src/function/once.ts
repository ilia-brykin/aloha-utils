/**
 * Creates a function that is restricted to invoking func once.
 *
 * @param {Function} func - The function to restrict.
 * @return {Function} The new restricted function.
 *
 * @example
 * const init = once(createApplication);
 */
export const once = (func: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  let called = false;
  let result: unknown;
  return function (this: unknown, ...args: unknown[]) {
    if (!called) {
      called = true;
      result = func.apply(this, args);
    }
    return result;
  };
};
