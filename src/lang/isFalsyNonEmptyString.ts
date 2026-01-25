/**
 * Checks if a value is falsy, excluding the empty string.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is falsy and not an empty string.
 *
 * @example
 * isFalsyNonEmptyString(false); // true
 * isFalsyNonEmptyString(""); // false
 */
export const isFalsyNonEmptyString = (value: unknown): boolean => {
  if (value === "") {
    return false;
  }

  return !value;
};
