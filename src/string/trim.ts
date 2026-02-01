import {
  trimCore,
} from "./_trim.js";

/**
 * Removes leading and trailing whitespace or specified characters from string.
 *
 * @param {string} [value=""] - The string to trim.
 * @param {string} [chars] - The characters to trim.
 * @return {string} The trimmed string.
 *
 * @example
 * trim("  aloha  "); // "aloha"
 * trim("-_-aloha-_-", "_-"); // "aloha"
 */
export const trim = (value?: unknown, chars?: unknown): string => {
  return trimCore(value, chars, "both");
};
