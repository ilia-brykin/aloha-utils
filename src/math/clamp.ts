/**
 * Clamps a number within the inclusive [min, max] range.
 *
 * @param {*} value - The value to clamp.
 * @param {*} min - The lower bound.
 * @param {*} max - The upper bound.
 * @return {number|undefined} The clamped number or undefined.
 *
 * @example
 * clamp(5, 0, 10); // 5
 * clamp(-2, 0, 10); // 0
 */
export const clamp = (value: unknown, min: unknown, max: unknown): number | undefined => {
  if (typeof value !== "number" ||
    typeof min !== "number" ||
    typeof max !== "number" ||
    Number.isNaN(value) ||
    Number.isNaN(min) ||
    Number.isNaN(max)) {
    return undefined;
  }

  if (min > max) {
    return undefined;
  }

  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};
