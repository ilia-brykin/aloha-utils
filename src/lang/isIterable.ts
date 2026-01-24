/**
 * Checks if a value is iterable.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is iterable.
 *
 * @example
 * isIterable([1, 2, 3]); // true
 * isIterable({}); // false
 */
export const isIterable = (value: unknown): value is Iterable<unknown> => {
  return (
    value !== null &&
    value !== undefined &&
    typeof (value as { [Symbol.iterator]?: unknown })[Symbol.iterator] === "function"
  );
};
