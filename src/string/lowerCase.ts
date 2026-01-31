import {
  toString,
} from "../lang";
import {
  toWords,
} from "./_shared.js";

const reApos = /['\u2019]/g;

/**
 * Converts string, as space separated words, to lower case.
 *
 * @param {string} [value=""] - The string to convert.
 * @return {string} The lower cased string.
 *
 * @example
 * lowerCase("Foo's BAR"); // "foos bar"
 * lowerCase("MünchenIstSchön"); // "münchen ist schön"
 * lowerCase("  hello_world  "); // "hello world"
 */
export const lowerCase = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  const normalized = stringValue.replace(reApos, "");
  const words = toWords(normalized);
  if (words.length === 0) {
    return "";
  }

  return words.map(word => word.toLowerCase()).join(" ");
};
