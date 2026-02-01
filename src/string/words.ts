import {
  splitWords,
} from "./_shared.js";
import {
  toString,
} from "../lang";

/**
 * Splits string into an array of its words.
 *
 * @param {string} [value=""] - The string to inspect.
 * @param {RegExp|string} [pattern] - The pattern to match words.
 * @return {string[]} The words of string.
 *
 * @example
 * words("fred, barney, & pebbles"); // ["fred", "barney", "pebbles"]
 * words("fred, barney, & pebbles", /[^, ]+/g); // ["fred", "barney", "&", "pebbles"]
 */
export const words = (value?: unknown, pattern?: RegExp | string): string[] => {
  const stringValue = toString(value);
  if (stringValue.length === 0) {
    return [];
  }

  if (pattern === undefined) {
    return splitWords(stringValue);
  }

  if (pattern instanceof RegExp) {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${ pattern.flags }g`;
    const regex = new RegExp(pattern.source, flags);
    const matches = stringValue.match(regex);
    return matches ?? [];
  }

  if (pattern === "") {
    return [];
  }

  return stringValue.match(new RegExp(pattern, "g")) ?? [];
};
