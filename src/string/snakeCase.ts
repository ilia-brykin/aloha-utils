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
 * snakeCase("Aloha Holla"); // "aloha_holla"
 * snakeCase("alohaHolla"); // "aloha_holla"
 */
export const snakeCase = (value: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  const parts = toLowerWords(stringValue);
  if (parts.length === 0) {
    return "";
  }

  return parts.join("_");
};
