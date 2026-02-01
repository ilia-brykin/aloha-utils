import {
  toString,
} from "../lang";
import {
  toWords,
} from "./_shared.js";

const reApos = /['\u2019]/g;

/**
 * Converts string, as space separated words, to upper case.
 *
 * @param {string} [value=""] - The string to convert.
 * @return {string} The upper cased string.
 *
 * @example
 * upperCase("--foo-bar"); // "FOO BAR"
 * upperCase("fooBar"); // "FOO BAR"
 * upperCase("__foo_bar__"); // "FOO BAR"
 */
export const upperCase = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  const normalized = stringValue.replace(reApos, "");
  const words = toWords(normalized);
  if (words.length === 0) {
    return "";
  }

  return words.map(word => word.toUpperCase()).join(" ");
};
