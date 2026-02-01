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
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1).toLowerCase();
};
