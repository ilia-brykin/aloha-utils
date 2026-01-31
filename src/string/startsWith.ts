import {
  toInteger,
  toString,
} from "../lang";

/**
 * Checks if string starts with the given target string.
 *
 * @param {string} [value=""] - The string to inspect.
 * @param {*} target - The string to search for.
 * @param {number} [position=0] - The position to search from.
 * @return {boolean} True if string starts with target, else false.
 *
 * @example
 * startsWith("abc", "a"); // true
 * startsWith("abc", "b"); // false
 * startsWith("abc", "b", 1); // true
 */
export const startsWith = (
  value?: unknown,
  target?: unknown,
  position?: unknown,
): boolean => {
  const stringValue = toString(value);
  const targetValue = toString(target);
  const length = stringValue.length;

  const start = position === undefined ?
    0 :
    Math.min(Math.max(toInteger(position), 0), length);

  return stringValue.slice(start, start + targetValue.length) === targetValue;
};
