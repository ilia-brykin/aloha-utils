import {
  PLACEHOLDER,
} from "./_placeholder.js";
import {
  mergeArgsRight,
} from "./_args.js";

/**
 * This method is like partial except that partially applied arguments are appended.
 *
 * @param {Function} func - The function to partially apply arguments to.
 * @param {...*} [partials] - The arguments to be partially applied.
 * @return {Function} The new partially applied function.
 *
 * @example
 * const greet = partialRight((g, n) => `${g} ${n}`, "fred");
 */
export const partialRight = (
  func: (...args: unknown[]) => unknown,
  ...partials: unknown[]
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const placeholder = (partialRight as unknown as { placeholder?: unknown }).placeholder ?? PLACEHOLDER;

  return function(this: unknown, ...args: unknown[]) {
    const merged = mergeArgsRight(partials, args, placeholder);
    return func.apply(this, merged);
  };
};

partialRight.placeholder = PLACEHOLDER;
