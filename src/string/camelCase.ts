import {
  toLowerWords,
} from "./_shared.js";

/**
 * Converts a string to camelCase.
 *
 * @param {*} value - The value to convert.
 * @return {string} The camelCased string.
 *
 * @example
 * camelCase("Foo Bar"); // "fooBar"
 * camelCase("__FOO_BAR__"); // "fooBar"
 * camelCase('--foo-bar--'); // "fooBar"
 */
export const camelCase = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const parts = toLowerWords(value);
  if (parts.length === 0) {
    return "";
  }

  return parts
    .map((part, index) => {
      if (index === 0) {
        return part;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
};
