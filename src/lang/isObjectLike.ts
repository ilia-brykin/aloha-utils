/**
 * Checks if a value is object-like (non-null and typeof "object").
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is object-like.
 *
 * @example
 * isObjectLike({}); // true
 * isObjectLike(null); // false
 */
export const isObjectLike = (value: unknown): value is object => {
  return value !== null && typeof value === "object";
};
