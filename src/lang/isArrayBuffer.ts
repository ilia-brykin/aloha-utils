import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is an ArrayBuffer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an ArrayBuffer.
 *
 * @example
 * isArrayBuffer(new ArrayBuffer(8)); // true
 * isArrayBuffer(new Uint8Array(4)); // false
 */
export const isArrayBuffer = (value: unknown): value is ArrayBuffer => {
  return toString.call(value) === "[object ArrayBuffer]";
};
