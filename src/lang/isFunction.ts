/**
 * Checks if a value is a function.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a function.
 *
 * @example
 * isFunction(() => {}); // true
 * isFunction(123); // false
 */
export const isFunction = (value: unknown): value is (..._args: unknown[]) => unknown => {
  return typeof value === "function";
};
