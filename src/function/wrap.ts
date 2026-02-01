/**
 * Creates a function that provides value to wrapper as its first argument.
 *
 * @param {*} value - The value to wrap.
 * @param {Function} [wrapper] - The wrapper function.
 * @return {Function} The new function.
 *
 * @example
 * const wrapped = wrap((text: string) => text.toUpperCase(), (fn, text) => fn(text));
 */
export const wrap = (
  value: unknown,
  wrapper?: (...args: unknown[]) => unknown,
): (...args: unknown[]) => unknown => {
  const wrapFunc = typeof wrapper === "function" ? wrapper : (val: unknown) => val;

  return function(this: unknown, ...args: unknown[]) {
    return wrapFunc.apply(this, [value, ...args]);
  };
};
