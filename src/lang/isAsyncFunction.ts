import {
  toString,
} from "./_shared.js";

/**
 * Checks if a value is an async function.
 *
 * @param {*} value - The value to check.
 * @return {boolean} True if the value is an async function.
 *
 * @example
 * isAsyncFunction(async() => {}); // true
 * isAsyncFunction(() => {}); // false
 */
export const isAsyncFunction = (value: unknown): value is (..._args: unknown[]) => Promise<unknown> => {
  return toString.call(value) === "[object AsyncFunction]";
};
