import {
  toString,
} from "../lang";

/**
 * Converts string, as a whole, to lower case just like String#toLowerCase.
 *
 * @param {string} [value=""] - The string to convert.
 * @return {string} The lower cased string.
 *
 * @example
 * toLower("--Foo-Bar--"); // "--foo-bar--"
 * toLower("fooBar"); // "foobar"
 * toLower("__FOO_BAR__"); // "__foo_bar__"
 */
export const toLower = (value?: unknown): string => {
  return toString(value).toLowerCase();
};
