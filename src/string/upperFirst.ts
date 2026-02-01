import {
  toString,
} from "../lang";

/**
 * Converts the first character of string to upper case.
 *
 * @param {string} [value=""] - The string to convert.
 * @return {string} The converted string.
 *
 * @example
 * upperFirst("aloha"); // "Aloha"
 * upperFirst("ALOHA"); // "ALOHA"
 */
export const upperFirst = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
};
