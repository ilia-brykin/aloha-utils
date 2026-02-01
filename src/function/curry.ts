import {
  mergeArgs,
  countNonPlaceholders,
} from "./_args.js";
import {
  PLACEHOLDER,
  isPlaceholder,
} from "./_placeholder.js";
import {
  toInteger,
} from "../lang";

/**
 * Creates a function that accepts arguments of func and either invokes func
 * returning its result, if at least arity number of arguments have been provided,
 * or returns a function that accepts the remaining func arguments.
 *
 * @param {Function} func - The function to curry.
 * @param {number} [arity=func.length] - The arity of func.
 * @return {Function} The new curried function.
 *
 * @example
 * const curried = curry((a, b, c) => [a, b, c]);
 */
export const curry = (
  func: (...args: unknown[]) => unknown,
  arity?: number,
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const maxArity = arity === undefined ? func.length : Math.max(0, toInteger(arity));
  const placeholder = (curry as unknown as { placeholder?: unknown }).placeholder ?? PLACEHOLDER;

  const wrap = (prevArgs: unknown[]): ((...args: unknown[]) => unknown) => {
    return function (this: unknown, ...args: unknown[]) {
      const combined = mergeArgs(prevArgs, args, placeholder);
      const filled = countNonPlaceholders(combined, placeholder);
      if (filled >= maxArity) {
        const finalArgs = combined.filter(arg => !isPlaceholder(arg, placeholder)).slice(0, maxArity);
        return func.apply(this, finalArgs);
      }
      return wrap(combined);
    };
  };

  return wrap([]);
};

curry.placeholder = PLACEHOLDER;
