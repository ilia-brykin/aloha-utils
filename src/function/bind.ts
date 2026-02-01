import {
  mergeArgs,
} from "./_args.js";
import {
  PLACEHOLDER,
} from "./_placeholder.js";

/**
 * Creates a function that invokes func with the this binding of thisArg and
 * partials prepended to the arguments it receives.
 *
 * @param {Function} func - The function to bind.
 * @param {*} thisArg - The this binding of func.
 * @param {...*} [partials] - The arguments to be partially applied.
 * @return {Function} The new bound function.
 *
 * @example
 * bind(function(a, b) { return a + b; }, null, 1)(2); // 3
 */
export const bind = (
  func: (...args: unknown[]) => unknown,
  thisArg: unknown,
  ...partials: unknown[]
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const placeholder = (bind as unknown as { placeholder?: unknown }).placeholder ?? PLACEHOLDER;

  return function (...args: unknown[]) {
    const merged = mergeArgs(partials, args, placeholder);
    return func.apply(thisArg, merged);
  };
};

bind.placeholder = PLACEHOLDER;
