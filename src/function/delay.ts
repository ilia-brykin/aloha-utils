import {
  toNumber,
} from "../lang";

/**
 * Invokes func after wait milliseconds.
 *
 * @param {Function} func - The function to delay.
 * @param {number} wait - The number of milliseconds to delay invocation.
 * @param {...*} [args] - The arguments to invoke func with.
 * @return {number} The timer id.
 *
 * @example
 * delay(text => console.log(text), 1000, "later");
 */
export const delay = (
  func: (...args: unknown[]) => unknown,
  wait: number,
  ...args: unknown[]
): number => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  return setTimeout(func, Math.max(0, toNumber(wait)), ...args) as unknown as number;
};
