/**
 * Checks if a value is a native function.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a native function.
 *
 * @example
 * isNative(Array.prototype.push); // true
 * isNative(() => {}); // false
 */
export const isNative = (value: unknown): value is (..._args: unknown[]) => unknown => {
  if (typeof value !== "function") {
    return false;
  }

  const source = Function.prototype.toString.call(value);
  return /\{\s*\[native code]\s*}/.test(source);
};
