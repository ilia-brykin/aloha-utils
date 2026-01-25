/**
 * Checks if a value is in the range [start, end).
 *
 * @param {*} value - The value to check.
 * @param {*} start - The start of the range.
 * @param {*} end - The end of the range.
 * @return {boolean} True if the value is within the range.
 *
 * @example
 * inRange(3, 2, 4); // true
 * inRange(4, 2, 4); // false
 */
export const inRange = (value: unknown, start: unknown, end: unknown): boolean => {
  if (typeof value !== "number" ||
    typeof start !== "number" ||
    typeof end !== "number" ||
    Number.isNaN(value) ||
    Number.isNaN(start) ||
    Number.isNaN(end)) {
    return false;
  }

  const [min, max] = start <= end ? [start, end] : [end, start];
  return value >= min && value < max;
};
