import {
  toString,
} from "../lang";

/**
 * Converts the first character of string to lower case.
 *
 * @param {string} [value=""] - The string to convert.
 * @return {string} The converted string.
 *
 * @example
 * lowerFirst("Aloha"); // "aloha"
 * lowerFirst("ALOHA"); // "aLOHA"
 */
export const lowerFirst = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  return stringValue.charAt(0).toLowerCase() + stringValue.slice(1);
};
