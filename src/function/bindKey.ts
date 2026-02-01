import {
  mergeArgs,
} from "./_args.js";
import {
  PLACEHOLDER,
} from "./_placeholder.js";

/**
 * Creates a function that invokes the method at object[key] with partials
 * prepended to the arguments it receives.
 *
 * @param {Object} object - The object to invoke the method on.
 * @param {string} key - The key of the method.
 * @param {...*} [partials] - The arguments to be partially applied.
 * @return {Function} The new bound function.
 *
 * @example
 * bindKey({ greet: (a, b) => a + b }, "greet", "hi")("!"); // "hi!"
 */
export const bindKey = (
  object: Record<string, unknown>,
  key: string,
  ...partials: unknown[]
): (...args: unknown[]) => unknown => {
  const placeholder = (bindKey as unknown as { placeholder?: unknown }).placeholder ?? PLACEHOLDER;

  return function (...args: unknown[]) {
    const method = object?.[key] as ((...values: unknown[]) => unknown) | undefined;
    if (typeof method !== "function") {
      throw new TypeError("Expected a function");
    }
    const merged = mergeArgs(partials, args, placeholder);
    return method.apply(object, merged);
  };
};

bindKey.placeholder = PLACEHOLDER;
