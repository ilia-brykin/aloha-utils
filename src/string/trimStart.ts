import {
  trimCore,
} from "./_trim.js";

/**
 * Removes leading whitespace or specified characters from string.
 *
 * @param {string} [value=""] - The string to trim.
 * @param {string} [chars] - The characters to trim.
 * @return {string} The trimmed string.
 *
 * @example
 * trimStart("  aloha  "); // "aloha  "
 * trimStart("-_-aloha-_-", "_-"); // "aloha-_-"
 */
export const trimStart = (value?: unknown, chars?: unknown): string => {
  return trimCore(value, chars, "start");
};
