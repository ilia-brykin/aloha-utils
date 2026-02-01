/**
 * Creates a function that invokes func with its arguments transformed.
 *
 * @param {Function} func - The function to wrap.
 * @param {...Function|Function[]} [transforms] - The argument transforms.
 * @return {Function} The new function.
 *
 * @example
 * const fn = overArgs((x, y) => [x, y], [Math.floor, n => n * 2]);
 */
export const overArgs = (
  func: (...args: unknown[]) => unknown,
  ...transforms: Array<((value: unknown) => unknown) | Array<(value: unknown) => unknown>>
): (...args: unknown[]) => unknown => {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  const flat = transforms.length === 1 && Array.isArray(transforms[0])
    ? transforms[0]
    : transforms;
  const applied = flat.map(transform => (typeof transform === "function" ? transform : (value: unknown) => value));

  return function(this: unknown, ...args: unknown[]) {
    const mapped = args.map((arg, index) => {
      const transform = applied[index];
      return transform ? transform(arg) : arg;
    });
    return func.apply(this, mapped);
  };
};
