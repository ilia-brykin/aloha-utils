import {
  debounce,
} from "./debounce.js";

/**
 * Creates a throttled function that only invokes func at most once per wait milliseconds.
 *
 * @param {Function} func - The function to throttle.
 * @param {number} [wait=0] - The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] - The options object.
 * @return {Function} The new throttled function.
 *
 * @example
 * const throttled = throttle(() => console.log("hi"), 100);
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 0,
  options: { leading?: boolean; trailing?: boolean } = {},
) => {
  const leading = options.leading !== false;
  const trailing = options.trailing !== false;
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
};
