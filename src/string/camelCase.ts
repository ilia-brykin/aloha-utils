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
 * camelCase("Aloha Holla"); // "alohaHolla""
 * camelCase("__ALOHA_HOLLA__"); // "alohaHolla"
 * camelCase('--aloha-holla--'); // "alohaHolla"
 */
export const camelCase = (value: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

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
