import {
  toInteger,
  toString,
} from "../lang";

/**
 * Repeats the given string n times.
 *
 * @param {string} [value=""] - The string to repeat.
 * @param {number} [n=1] - The number of times to repeat the string.
 * @return {string} The repeated string.
 *
 * @example
 * repeat("aloha", 2); // "alohaaloha"
 * repeat("*", 5); // "*****"
 * repeat("hi", 0); // ""
 */
export const repeat = (value?: unknown, n?: unknown): string => {
  const stringValue = toString(value);
  const count = toInteger(n);

  if (count <= 0 || stringValue.length === 0) {
    return "";
  }

  if (count === 1) {
    return stringValue;
  }

  return stringValue.repeat(count);
};
