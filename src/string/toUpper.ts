import {
  toString,
} from "../lang";

/**
 * Converts string, as a whole, to the upper case just like String#toUpperCase.
 *
 * @param {string} [value=""] - The string to convert.
 * @return {string} The upper-cased string.
 *
 * @example
 * toUpper("--foo-bar--"); // "--FOO-BAR--"
 * toUpper("fooBar"); // "FOOBAR"
 * toUpper("__foo_bar__"); // "__FOO_BAR__"
 */
export const toUpper = (value?: unknown): string => {
  return toString(value).toUpperCase();
};
