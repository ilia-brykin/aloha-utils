import {
  trimCore,
} from "./_trim.js";

/**
 * Removes trailing whitespace or specified characters from string.
 *
 * @param {string} [value=""] - The string to trim.
 * @param {string} [chars] - The characters to trim.
 * @return {string} The trimmed string.
 *
 * @example
 * trimEnd("  aloha  "); // "  aloha"
 * trimEnd("-_-aloha-_-", "_-"); // "-_-aloha"
 */
export const trimEnd = (value?: unknown, chars?: unknown): string => {
  return trimCore(value, chars, "end");
};
