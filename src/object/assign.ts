/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
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
 * assign({ a: 0 }, new Foo(), new Bar()); // { a: 1, c: 3 }
 */
export const assign = (
  object: unknown,
  ...sources: unknown[]
): Record<string, unknown> => {
  const target = Object(object) as Record<string, unknown>;

  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }

    const src = Object(source) as Record<string, unknown>;
    const keys = Object.keys(src);
    for (const key of keys) {
      target[key] = src[key];
    }
  }

  return target;
};
