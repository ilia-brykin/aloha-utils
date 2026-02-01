import {
  countNonPlaceholders,
  mergeArgsRight,
} from "./_args.js";
import {
  isPlaceholder,
  PLACEHOLDER,
} from "./_placeholder.js";
import {
  toInteger,
} from "../lang";

/**
 * This method is like curry except that arguments are applied in the manner of
 * partialRight.
 *
 * @param {Function} func - The function to curry.
 * @param {number} [arity=func.length] - The arity of func.
 * @return {Function} The new curried function.
 *
 * @example
 * const curried = curryRight((a, b, c) => [a, b, c]);
 */
export const curryRight = (
  func: (...args: unknown[]) => unknown,
  arity?: number,
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const maxArity = arity === undefined ? func.length : Math.max(0, toInteger(arity));
  const placeholder = (curryRight as unknown as { placeholder?: unknown }).placeholder ?? PLACEHOLDER;

  const wrap = (prevArgs: unknown[]): ((...args: unknown[]) => unknown) => {
    return function(this: unknown, ...args: unknown[]) {
      const combined = mergeArgsRight(prevArgs, args, placeholder);
      const filled = countNonPlaceholders(combined, placeholder);
      if (filled >= maxArity) {
        const filtered = combined.filter(arg => !isPlaceholder(arg, placeholder));
        const finalArgs = filtered.slice(filtered.length - maxArity);
        return func.apply(this, finalArgs);
      }
      return wrap(combined);
    };
  };

  return wrap([]);
};

curryRight.placeholder = PLACEHOLDER;
