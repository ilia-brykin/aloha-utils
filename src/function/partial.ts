import {
  PLACEHOLDER,
} from "./_placeholder.js";
import {
  mergeArgs,
} from "./_args.js";

/**
 * Creates a function that invokes func with partials prepended to the arguments it receives.
 *
 * @param {Function} func - The function to partially apply arguments to.
 * @param {...*} [partials] - The arguments to be partially applied.
 * @return {Function} The new partially applied function.
 *
 * @example
 * const sayHello = partial((g, n) => `${g} ${n}`, "hello");
 */
export const partial = (
  func: (...args: unknown[]) => unknown,
  ...partials: unknown[]
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const placeholder = (partial as unknown as { placeholder?: unknown }).placeholder ?? PLACEHOLDER;

  return function(this: unknown, ...args: unknown[]) {
    const merged = mergeArgs(partials, args, placeholder);
    return func.apply(this, merged);
  };
};

partial.placeholder = PLACEHOLDER;
