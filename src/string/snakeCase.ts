import {
  toLowerWords,
} from "./_shared.js";
import {
  toString,
} from "../lang";

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
  const stringValue = toString(value);

  const parts = toLowerWords(stringValue);
  if (parts.length === 0) {
    return "";
  }

  return parts.join("_");
};
