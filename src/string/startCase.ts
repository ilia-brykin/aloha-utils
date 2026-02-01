import {
  toString,
} from "../lang";
import {
  toWords,
} from "./_shared.js";

const reApos = /['\u2019]/g;

const upperFirst = (value: string): string => {
  if (value.length === 0) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
};

/**
 * Converts string to a start case.
 *
 * @param {string} [value=""] - The string to convert.
 * @return {string} The start cased string.
 *
 * @example
 * startCase("--foo-bar--"); // "Foo Bar"
 * startCase("fooBar"); // "Foo Bar"
 * startCase("__FOO_BAR__"); // "FOO BAR"
 */
export const startCase = (value?: unknown): string => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return "";
  }

  const normalized = stringValue.replace(reApos, "");
  const words = toWords(normalized);
  if (words.length === 0) {
    return "";
  }

  return words.map(word => upperFirst(word)).join(" ");
};
