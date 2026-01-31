import {
  toString,
} from "../lang";

/**
 * Converts the first character of string to the upper case and the remaining to lower case.
 *
 * @param {string} [value=""] - The string to capitalize.
 * @return {string} The capitalized string.
 *
 * @example
 * capitalize("BORIS"); // "Boris"
 */
export const capitalize = (value?: unknown): string => {
  const str = toString(value);
  if (str.length === 0) {
    return "";
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
