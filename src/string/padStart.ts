import {
  createPadding,
} from "./_pad.js";
import {
  toInteger,
  toString,
} from "../lang";

/**
 * Pads string on the left side if it's shorter than length.
 * Padding characters are truncated if they exceed length.
 *
 * @param {string} [value=""] - The string to pad.
 * @param {number} [length=0] - The padding length.
 * @param {string} [chars=" "] - The string used as padding.
 * @return {string} The padded string.
 *
 * @example
 * padStart("aloha", 8); // "   aloha"
 * padStart("aloha", 8, "_-"); // "_-_aloha"
 * padStart("aloha", 3); // "aloha"
 */
export const padStart = (
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
  const left = createPadding(paddingLength, chars ?? " ");
  return `${ left }${ stringValue }`;
};
