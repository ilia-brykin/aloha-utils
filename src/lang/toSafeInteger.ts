import {
  toInteger,
} from "./toInteger.js";

/**
 * Converts a value to a safe integer.
 * A safe integer can be compared and represented correctly.
 *
 * @param {*} value - The value to convert.
 * @return {number} The safe integer representation.
 *
 * @example
 * toSafeInteger(3.2); // 3
 * toSafeInteger(Number.MIN_VALUE); // 0
 * toSafeInteger(Infinity); // 9007199254740991
 * toSafeInteger("3.2"); // 3
 */
export const toSafeInteger = (value: unknown): number => {
  const integer = toInteger(value);
  const max = Number.MAX_SAFE_INTEGER;
  const min = -max;

  if (integer > max) {
    return max;
  }

  if (integer < min) {
    return min;
  }

  return integer;
};
