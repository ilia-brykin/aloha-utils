import {
  toLowerWords,
} from "./_shared.js";

/**
 * Converts a string to PascalCase.
 *
 * @param {*} value - The value to convert.
 * @return {string} The PascalCased string.
 *
 * @example
 * pascalCase("foo bar"); // "FooBar"
 * pascalCase("__FOO_BAR__"); // "FooBar"
 */
export const pascalCase = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const parts = toLowerWords(value);
  if (parts.length === 0) {
    return "";
  }

  return parts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};
