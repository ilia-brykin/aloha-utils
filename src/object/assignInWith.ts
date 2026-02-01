type AssignInCustomizer = (
  objValue: unknown,
  srcValue: unknown,
  key: string,
  object: Record<string, unknown>,
  source: Record<string, unknown>,
) => unknown;

/**
 * This method is like assignIn except that it accepts customizer which is invoked
 * to produce the assigned values.
 *
 * @param {Object} object - The destination object.
 * @param {...Object} sources - The source objects.
 * @param {Function} [customizer] - The function to customize assigned values.
 * @return {Object} Returns object.
 *
 * @example
 * function customizer(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * }
 *
 * assignInWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer); // { a: 1, b: 2 }
 */
export function assignInWith(
  object: unknown,
  sources?: unknown,
  customizer?: AssignInCustomizer,
): Record<string, unknown> {
  const args = Array.from(arguments).slice(1);
  let resolvedCustomizer: AssignInCustomizer | undefined;
  let resolvedSources = args;

  const last = args[args.length - 1];
  if (typeof last === "function") {
    resolvedCustomizer = last as AssignInCustomizer;
    resolvedSources = args.slice(0, -1);
  }

  const target = Object(object) as Record<string, unknown>;

  for (const source of resolvedSources) {
    if (source === null || source === undefined) {
      continue;
    }

    const src = Object(source) as Record<string, unknown>;
    for (const key in src) {
      const srcValue = src[key];
      if (resolvedCustomizer) {
        const objValue = target[key];
        const customized = resolvedCustomizer(objValue, srcValue, key, target, src);
        target[key] = customized === undefined ? srcValue : customized;
      } else {
        target[key] = srcValue;
      }
    }
  }

  return target;
}
