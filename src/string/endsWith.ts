import {
  toInteger,
  toString,
} from "../lang";

/**
 * Checks if the string ends with the given target string.
 *
 * @param {string} [value=""] - The string to inspect.
 * @param {*} target - The string to search for.
 * @param {number} [position=value.length] - The position to search up to.
 * @return {boolean} True if string ends with target, else false.
 *
 * @example
 * endsWith("abc", "c"); // true
 * endsWith("abc", "b"); // false
 * endsWith("abc", "b", 2); // true
 */
export const endsWith = (
  value?: unknown,
  target?: unknown,
  position?: unknown,
): boolean => {
  const stringValue = toString(value);
  const targetValue = toString(target);
  const length = stringValue.length;

  const end = position === undefined ?
    length :
    Math.min(Math.max(toInteger(position), 0), length);

  const start = end - targetValue.length;
  return start >= 0 && stringValue.slice(start, end) === targetValue;
};
