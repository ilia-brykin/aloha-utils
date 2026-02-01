import {
  mergeBase,
} from "./merge.js";

type MergeCustomizer = (
  objValue: unknown,
  srcValue: unknown,
  key: string,
  object: Record<string, unknown>,
  source: Record<string, unknown>,
  stack?: unknown,
) => unknown;

/**
 * This method is like merge except that it accepts customizer which is invoked
 * to produce the merged values.
 *
 * @param {Object} object - The destination object.
 * @param {...Object} sources - The source objects.
 * @param {Function} customizer - The function to customize assigned values.
 * @return {Object} Returns object.
 *
 * @example
 * function customizer(objValue, srcValue) {
 *   if (Array.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * mergeWith({ a: [1] }, { a: [2] }, customizer); // { a: [1, 2] }
 */
export function mergeWith(
  object: unknown,
  sources?: unknown,
  customizer?: MergeCustomizer,
): Record<string, unknown> {
  const args = Array.from(arguments).slice(1);
  const last = args[args.length - 1];
  const resolvedCustomizer = typeof last === "function"
    ? (last as MergeCustomizer)
    : undefined;
  const resolvedSources = resolvedCustomizer ? args.slice(0, -1) : args;

  return mergeBase(object, resolvedSources, resolvedCustomizer);
}
