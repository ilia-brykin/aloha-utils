/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that resolve
 * to undefined.
 *
 * @param {Object} object - The destination object.
 * @param {...Object} [sources] - The source objects.
 * @return {Object} Returns object.
 *
 * @example
 * defaults({ a: 1 }, { b: 2 }, { a: 3 }); // { a: 1, b: 2 }
 */
export const defaults = (
  object: unknown,
  ...sources: unknown[]
): Record<string, unknown> => {
  const target = Object(object) as Record<string, unknown>;

  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    const src = Object(source) as Record<string, unknown>;
    for (const key in src) {
      if (target[key] === undefined) {
        target[key] = src[key];
      }
    }
  }

  return target;
};
