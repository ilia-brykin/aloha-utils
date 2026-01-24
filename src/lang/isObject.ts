/**
 * Checks if a value is an object or a function (and not null).
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is object-like or a function.
 *
 * @example
 * isObject({}); // true
 * isObject(() => {}); // true
 */
export const isObject = (value: unknown): value is object | ((..._args: unknown[]) => unknown) => {
  const type = typeof value;
  return value !== null && (type === "object" || type === "function");
};
