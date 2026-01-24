/**
 * Checks if a value is array-like (has a finite, non-negative integer length).
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is array-like.
 *
 * @example
 * isArrayLike([1, 2]); // true
 * isArrayLike("abc"); // true
 */
export const isArrayLike = (value: unknown): value is { length: number } => {
  if (value === null || value === undefined || typeof value === "function") {
    return false;
  }

  const length = (value as { length?: unknown }).length;
  return (
    typeof length === "number" &&
    Number.isFinite(length) &&
    length >= 0 &&
    Number.isInteger(length)
  );
};
