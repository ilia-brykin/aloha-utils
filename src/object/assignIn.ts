/**
 * This method is like assign except that it iterates over own and inherited
 * source properties.
 *
 * @param {Object} object - The destination object.
 * @param {...Object} [sources] - The source objects.
 * @return {Object} Returns object.
 *
 * @example
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * assignIn({ a: 0 }, new Foo(), new Bar()); // { a: 1, b: 2, c: 3, d: 4 }
 */
export const assignIn = (
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
      target[key] = src[key];
    }
  }

  return target;
};
