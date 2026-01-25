import {
  toLowerWords,
} from "./_shared.js";

/**
 * Converts a string to snake_case.
 *
 * @param {*} value - The value to convert.
 * @return {string} The snake_cased string.
 *
 * @example
 * snakeCase("Foo Bar"); // "foo_bar"
 * snakeCase("fooBar"); // "foo_bar"
 */
export const snakeCase = (value: unknown): string => {
  if (typeof value !== "string") {
    return "";
  }

  const parts = toLowerWords(value);
  if (parts.length === 0) {
    return "";
  }

  return parts.join("_");
};
