type AssignCustomizer = (
  objValue: unknown,
  srcValue: unknown,
  key: string,
  object: Record<string, unknown>,
  source: Record<string, unknown>,
) => unknown;

/**
 * This method is like assign except that it accepts customizer which is invoked
 * to produce the assigned values.
 *
 * @param {Object} object - The destination object.
 * @param {...Object} [sources] - The source objects.
 * @param {Function} [customizer] - The function to customize assigned values.
 * @return {Object} Returns object.
 *
 * @example
 * function customizer(objValue, srcValue) {
 *   return objValue === undefined ? srcValue : objValue;
 * }
 *
 * assignWith({ a: 1 }, { b: 2 }, { a: 3 }, customizer); // { a: 1, b: 2 }
 */
export function assignWith(
  object: unknown,
  sources?: unknown,
  customizer?: AssignCustomizer,
): Record<string, unknown> {
  const args = Array.from(arguments).slice(1);
  let resolvedCustomizer: AssignCustomizer | undefined;
  let resolvedSources = args;

  const last = args[args.length - 1];
  if (typeof last === "function") {
    resolvedCustomizer = last as AssignCustomizer;
    resolvedSources = args.slice(0, -1);
  }

  const target = Object(object) as Record<string, unknown>;

  for (const source of resolvedSources) {
    if (source === null || source === undefined) {
      continue;
    }

    const src = Object(source) as Record<string, unknown>;
    const keys = Object.keys(src);
    for (const key of keys) {
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
