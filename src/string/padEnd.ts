import {
  createPadding,
} from "./_pad.js";
import {
  toInteger,
  toString,
} from "../lang";

/**
 * Pads string on the right side if it's shorter than length.
 * Padding characters are truncated if they exceed length.
 *
 * @param {string} [value=""] - The string to pad.
 * @param {number} [length=0] - The padding length.
 * @param {string} [chars=" "] - The string used as padding.
 * @return {string} The padded string.
 *
 * @example
 * padEnd("aloha", 8); // "aloha   "
 * padEnd("aloha", 8, "_-"); // "aloha_-_"
 * padEnd("aloha", 3); // "aloha"
 */
export const padEnd = (
  value?: unknown,
  length?: unknown,
  chars?: unknown,
): string => {
  const stringValue = toString(value);
  const targetLength = toInteger(length);

  if (targetLength <= stringValue.length) {
    return stringValue;
  }

  const paddingLength = targetLength - stringValue.length;
  const right = createPadding(paddingLength, chars ?? " ");
  return `${ stringValue }${ right }`;
};
