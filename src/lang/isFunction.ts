export const isFunction = (
  value: unknown,
): value is (..._args: unknown[]) => unknown => typeof value === "function";

