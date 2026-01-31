import {
  createPadding,
} from "./_pad.js";
import {
  toInteger,
  toString,
} from "../lang";

/**
 * Pads string on the left and right sides if it's shorter than length.
 * Padding characters are truncated if they can't be evenly divided by length.
 *
 * @param {string} [value=""] - The string to pad.
 * @param {number} [length=0] - The padding length.
 * @param {string} [chars=" "] - The string used as padding.
 * @return {string} The padded string.
 *
 * @example
 * pad("aloha", 10); // "  aloha   "
 * pad("aloha", 10, "_-"); // "_-aloha_-_"
 * pad("aloha", 3); // "aloha"
 */
export const pad = (
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
  const leftLength = Math.floor(paddingLength / 2);
  const rightLength = paddingLength - leftLength;

  const left = createPadding(leftLength, chars ?? " ");
  const right = createPadding(rightLength, chars ?? " ");

  return `${ left }${ stringValue }${ right }`;
};
