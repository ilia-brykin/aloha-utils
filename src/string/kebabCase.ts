import {
  toLowerWords,
} from "./_shared.js";

/**
 * Converts a string to kebab-case.
 *
 * @param {*} value - The value to convert.
 * @return {string} The kebab-cased string.
 *
 * @example
 * kebabCase("Foo Bar"); // "foo-bar"
 * kebabCase("fooBar"); // "foo-bar"
 */
export const kebabCase = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const parts = toLowerWords(value);
  if (parts.length === 0) {
    return "";
  }

  return parts.join("-");
};
