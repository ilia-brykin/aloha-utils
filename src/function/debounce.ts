import {
  toNumber,
} from "../lang";

type Debounced<T extends (...args: unknown[]) => unknown> = ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
  cancel: () => void;
  flush: () => ReturnType<T> | undefined;
};

/**
 * Creates a debounced function that delays invoking func until after wait
 * milliseconds have elapsed since the last time it was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} [wait=0] - The number of milliseconds to delay.
 * @param {Object} [options={}] - The options object.
 * @return {Function} The new debounced function.
 *
 * @example
 * const debounced = debounce(() => console.log("hi"), 100);
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number = 0,
  options: { leading?: boolean; trailing?: boolean; maxWait?: number } = {},
): Debounced<T> => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  let timerId: ReturnType<typeof setTimeout> | undefined;
  let lastArgs: Parameters<T> | undefined;
  let lastThis: unknown;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;
  let result: ReturnType<T> | undefined;

  const waitMs = Math.max(0, toNumber(wait));
  const leading = Boolean(options.leading);
  const trailing = options.trailing !== false;
  const maxWait = options.maxWait !== undefined ? Math.max(0, toNumber(options.maxWait)) : undefined;

  const invokeFunc = (time: number): ReturnType<T> => {
    lastInvokeTime = time;
    const args = lastArgs as Parameters<T>;
    lastArgs = undefined;
    const thisArg = lastThis;
    lastThis = undefined;
    result = func.apply(thisArg as unknown, args) as ReturnType<T>;
    return result as ReturnType<T>;
  };

  const shouldInvoke = (time: number): boolean => {
    if (lastCallTime === undefined) {
      return true;
    }
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return timeSinceLastCall >= waitMs ||
      timeSinceLastCall < 0 ||
      (maxWait !== undefined && timeSinceLastInvoke >= maxWait);
  };

  const startTimer = (pendingFunc: () => void, timeout: number): void => {
    timerId = setTimeout(pendingFunc, timeout);
  };

  const remainingWait = (time: number): number => {
    const timeSinceLastCall = time - (lastCallTime ?? 0);
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = waitMs - timeSinceLastCall;
    return maxWait === undefined ? timeWaiting : Math.min(timeWaiting, maxWait - timeSinceLastInvoke);
  };

  const timerExpired = (): void => {
    const now = Date.now();
    if (shouldInvoke(now)) {
      if (trailing && lastArgs) {
        invokeFunc(now);
      }
      timerId = undefined;
      return;
    }
    startTimer(timerExpired, remainingWait(now));
  };

  const debounced = function (this: unknown, ...args: Parameters<T>): ReturnType<T> | undefined {
    const now = Date.now();
    const invokeNow = shouldInvoke(now);
    lastArgs = args;
    lastThis = this;
    lastCallTime = now;
    if (invokeNow) {
      if (timerId === undefined) {
        if (leading) {
          return invokeFunc(now);
        }
        startTimer(timerExpired, waitMs);
      } else if (maxWait !== undefined) {
        startTimer(timerExpired, remainingWait(now));
        return invokeFunc(now);
      }
    }

    if (timerId === undefined) {
      startTimer(timerExpired, waitMs);
    }

    return result;
  } as Debounced<T>;

  debounced.cancel = (): void => {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    timerId = undefined;
    lastArgs = undefined;
    lastThis = undefined;
    lastCallTime = undefined;
    lastInvokeTime = 0;
  };

  debounced.flush = (): ReturnType<T> | undefined => {
    if (timerId === undefined) {
      return result;
    }
    return trailing && lastArgs ? invokeFunc(Date.now()) : result;
  };

  return debounced;
};
