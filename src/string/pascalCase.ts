import {
  toLowerWords,
} from "./_shared.js";
import {
  toString,
} from "../lang";

/**
 * Converts a string to PascalCase.
 *
 * @param {*} value - The value to convert.
 * @return {string} The PascalCased string.
 *
 * @example
 * pascalCase("aloha holla"); // "AlohaHolla"
 * pascalCase("__ALOHA_HOLLA__"); // "AlohaHolla"
 */
export const pascalCase = (value: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  const parts = toLowerWords(stringValue);
  if (parts.length === 0) {
    return "";
  }

  return parts
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
};
