import {
  toLowerWords,
} from "./_shared.js";
import {
  toString,
} from "../lang";

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
  const stringValue = toString(value);

  const parts = toLowerWords(stringValue);
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
