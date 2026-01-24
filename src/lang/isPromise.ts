/**
 * Checks if a value is a Promise.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a Promise.
 *
 * @example
 * isPromise(Promise.resolve(1)); // true
 * isPromise({ then: () => {} }); // false
 */
export const isPromise = (value: unknown): value is Promise<unknown> => {
  return (
    value !== null &&
    (typeof value === "object" || typeof value === "function") &&
    typeof (value as { then?: unknown }).then === "function" &&
    typeof (value as { catch?: unknown }).catch === "function"
  );
};
