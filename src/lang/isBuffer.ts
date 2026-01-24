/**
 * Checks if a value is a Node.js Buffer.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is a Buffer.
 *
 * @example
 * isBuffer(Buffer.from("hi")); // true
 * isBuffer(new Uint8Array(4)); // false
 */
export const isBuffer = (value: unknown): value is Buffer => {
  return typeof Buffer !== "undefined" && Buffer.isBuffer(value);
};
