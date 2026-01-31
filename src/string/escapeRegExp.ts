import {
  toString,
} from "../lang";

const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
const reHasRegExpChar = RegExp(reRegExpChar.source);

/**
 * Escapes the RegExp special characters "^", "$", "\", ".", "*", "+", "?",
 * "(", ")", "[", "]", "{", "}", and "|" in string.
 *
 * @param {string} [value=""] - The string to escape.
 * @return {string} The escaped string.
 *
 * @example
 * escapeRegExp("Price (USD) $5.99");
 * // "Price \\(USD\\) \\$5\\.99"
 */
export const escapeRegExp = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  return reHasRegExpChar.test(stringValue) ?
    stringValue.replace(reRegExpChar, "\\$&") :
    stringValue;
};
