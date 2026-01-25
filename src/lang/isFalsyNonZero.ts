/**
 * Checks if a value is falsy, excluding 0 and -0.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is falsy and not 0 or -0.
 *
 * @example
 * isFalsyNonZero(""); // true
 * isFalsyNonZero(0); // false
 */
export const isFalsyNonZero = (value: unknown): boolean => {
  if (value === 0 || Object.is(value, -0)) {
    return false;
  }

  return !value;
};
